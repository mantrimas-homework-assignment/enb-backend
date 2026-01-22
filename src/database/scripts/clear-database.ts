import { Hardware } from '../../product-listings/entities/hardware.entity';
import { Region } from '../../product-listings/entities/region.entity';
import { Platform } from '../../product-listings/entities/platform.entity';
import { Game } from '../../product-listings/entities/game.entity';
import { ProductPreset } from '../../product-listings/entities/product-preset.entity';
import { ProductListing } from '../../product-listings/entities/product-listing.entity';
import { createDataSource } from './utils/datasource.util';

const dataSource = createDataSource();

async function clearDatabase() {
    try {
        console.log('Clearing database...');
        console.log('');
        
        await dataSource.initialize();

        console.log('Deleting Product Listings...');
        const productListingRepo = dataSource.getRepository(ProductListing);
        const listingsDeleted = await productListingRepo.delete({});
        console.log(`✓ Deleted ${listingsDeleted.affected || 0} product listings`);

        console.log('Deleting Product Presets...');
        const productPresetRepo = dataSource.getRepository(ProductPreset);
        const presetsDeleted = await productPresetRepo.delete({});
        console.log(`✓ Deleted ${presetsDeleted.affected || 0} product presets`);

        console.log('Deleting Games...');
        const gameRepo = dataSource.getRepository(Game);
        const gamesDeleted = await gameRepo.delete({});
        console.log(`✓ Deleted ${gamesDeleted.affected || 0} games`);

        console.log('Deleting Platforms...');
        const platformRepo = dataSource.getRepository(Platform);
        const platformsDeleted = await platformRepo.delete({});
        console.log(`✓ Deleted ${platformsDeleted.affected || 0} platforms`);

        console.log('Deleting Regions...');
        const regionRepo = dataSource.getRepository(Region);
        const regionsDeleted = await regionRepo.delete({});
        console.log(`✓ Deleted ${regionsDeleted.affected || 0} regions`);

        console.log('Deleting Hardware...');
        const hardwareRepo = dataSource.getRepository(Hardware);
        const hardwareDeleted = await hardwareRepo.delete({});
        console.log(`✓ Deleted ${hardwareDeleted.affected || 0} hardware entries`);

        console.log('');
        console.log('✅ Database cleared successfully!');
        
    } catch (error) {
        console.error('❌ Error clearing database:', error);
        process.exit(1);
    } finally {
        await dataSource.destroy();
    }
}

clearDatabase();

