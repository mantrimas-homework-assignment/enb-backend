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

        const productPresets = await productPresetRepo.find({ relations: ['game', 'platform'] });

        if (productPresets.length === 0) {
            console.error('Please seed Product Presets first!');
            process.exit(1);
        }

        const existingCount = await productListingRepo.count();
        
        if (existingCount > 0) {
            console.log(`Product Listings already seeded (${existingCount} records). Skipping...`);
            return;
        }

        const productListings = [];

        for (const preset of productPresets) {
            const basePrice = 5999;
            productListings.push(
                productListingRepo.create({
                    productPreset: preset,
                    price: basePrice,
                    cashback: 600,
                    discountedPrice: basePrice - 1000,
                    likeCount: 42,
                })
            );
            
            productListings.push(
                productListingRepo.create({
                    productPreset: preset,
                    price: basePrice + 500,
                    cashback: 650,
                    discountedPrice: basePrice,
                    likeCount: 38,
                })
            );
            
            productListings.push(
                productListingRepo.create({
                    productPreset: preset,
                    price: basePrice - 1000,
                    cashback: 550,
                    discountedPrice: basePrice - 1500,
                    likeCount: 51,
                })
            );
        }

        const savedListings = await productListingRepo.save(productListings);
        console.log(`Successfully seeded ${savedListings.length} product listings (upsert mode)`);
        
    } catch (error) {
        console.error('Error seeding product listings:', error);
        process.exit(1);
    } finally {
        await dataSource.destroy();
    }
}

seedProductListings();
