import { ProductPreset } from '../../product-listings/entities/product-preset.entity';
import { ProductListing } from '../../product-listings/entities/product-listing.entity';
import { createDataSource } from './utils/datasource.util';

const dataSource = createDataSource();

async function seedProductListings() {
    try {
        console.log('Seeding Product Listings...');
        await dataSource.initialize();

        const productListingRepo = dataSource.getRepository(ProductListing);
        const productPresetRepo = dataSource.getRepository(ProductPreset);

        const productPresets = await productPresetRepo.find();

        if (productPresets.length === 0) {
            console.error('Please seed Product Presets first!');
            process.exit(1);
        }

        await productListingRepo.createQueryBuilder().delete().execute();

        const productListings = [];

        for (const preset of productPresets) {
            const numListings = Math.floor(Math.random() * 4) + 2;
            
            for (let i = 0; i < numListings; i++) {
                const basePrice = Math.floor(Math.random() * 50 + 10) * 100;
                const cashback = Math.floor(basePrice * 0.11);
                const discountedPrice = basePrice - Math.floor(Math.random() * basePrice * 0.3); 
                const likeCount = Math.floor(Math.random() * 100);

                const listing = productListingRepo.create({
                    productPreset: preset,
                    price: basePrice,
                    cashback: cashback,
                    discountedPrice: discountedPrice,
                    likeCount: likeCount,
                });
                productListings.push(listing);
            }
        }

        const savedListings = await productListingRepo.save(productListings);
        console.log(`Successfully seeded ${savedListings.length} product listings`);
        
    } catch (error) {
        console.error('Error seeding product listings:', error);
        process.exit(1);
    } finally {
        await dataSource.destroy();
    }
}

seedProductListings();

