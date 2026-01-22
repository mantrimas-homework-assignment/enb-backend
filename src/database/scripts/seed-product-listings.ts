import { ProductPreset } from '../../product-listings/entities/product-preset.entity';
import { ProductListing } from '../../product-listings/entities/product-listing.entity';
import { createDataSource } from './utils/datasource.util';
import { Repository } from 'typeorm';

const dataSource = createDataSource();

const GAME_BASE_PRICES: { [key: string]: number } = {
    'Elden Ring': 2999,
    'Cyberpunk 2077': 2499,
    'The Legend of Zelda: Breath of the Wild': 3999,
    'God of War': 3499,
    'Split Fiction': 1999,
    'Red Dead Redemption 2': 2799,
    'FIFA 23': 1999,
};

async function seedProductListings() {
    try {
        console.log('Seeding Product Listings...');
        await dataSource.initialize();

        const productListingRepository = dataSource.getRepository(ProductListing);
        const productPresetRepository = dataSource.getRepository(ProductPreset);

        const productPresets = await productPresetRepository.find({ relations: ['game', 'platform'] });

        if (productPresets.length === 0) {
            console.error('Please seed Product Presets first!');
            process.exit(1);
        }

        const productListings = [];

        for (const preset of productPresets) {
            const numListings = randomBetween(3, 5);
            const listings = createListingsForPreset(productListingRepository, preset, numListings);
            productListings.push(...listings);
        }

        const savedListings = await productListingRepository.save(productListings);
        console.log(`Successfully seeded ${savedListings.length} product listings (upsert mode)`);
        
    } catch (error) {
        console.error('Error seeding product listings:', error);
        process.exit(1);
    } finally {
        await dataSource.destroy();
    }
}

function createListingsForPreset(
    productListingRepository: Repository<ProductListing>,
    preset: ProductPreset,
    numListings: number = 3
): any[] {
    const listings = [];
    const gameName = preset.game.name;
    const basePrice = GAME_BASE_PRICES[gameName] || 2999;

    for (let i = 0; i < numListings; i++) {
        const priceVariation = randomBetween(-500, 500);
        const price = basePrice + priceVariation;
        
        const discountPercent = generateRandomDiscount();
        let discountedPrice: number | null = null;
        
        if (discountPercent !== null) {
            const discountAmount = Math.round(price * (discountPercent / 100));
            discountedPrice = price - discountAmount;
        }
        
        const finalPrice = discountedPrice || price;
        const cashback = calculateCashback(finalPrice);
        const likeCount = randomBetween(10, 150);
        
        listings.push(
            productListingRepository.create({
                productPreset: preset,
                price: price,
                cashback: cashback,
                discountedPrice: discountedPrice,
                likeCount: likeCount,
            })
        );
    }

    return listings;
}

function generateRandomDiscount(): number | null {
    const shouldHaveDiscount = Math.random() > 0.4;
    if (!shouldHaveDiscount) return null;
    
    return randomBetween(5, 80);
}

function calculateCashback(finalPrice: number): number {
    return Math.round(finalPrice * 0.11);
}

function randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

seedProductListings();
