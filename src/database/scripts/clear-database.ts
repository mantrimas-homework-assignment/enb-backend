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
        const listingsDeleted = await dataSource
            .createQueryBuilder()
            .delete()
            .from(ProductListing)
            .execute();
        console.log(`✓ Deleted ${listingsDeleted.affected || 0} product listings`);

        console.log('Deleting Product Presets...');
        const presetsDeleted = await dataSource
            .createQueryBuilder()
            .delete()
            .from(ProductPreset)
            .execute();
        console.log(`✓ Deleted ${presetsDeleted.affected || 0} product presets`);

        console.log('Deleting Games...');
        const gamesDeleted = await dataSource
            .createQueryBuilder()
            .delete()
            .from(Game)
            .execute();
        console.log(`✓ Deleted ${gamesDeleted.affected || 0} games`);

        console.log('Deleting Platforms...');
        const platformsDeleted = await dataSource
            .createQueryBuilder()
            .delete()
            .from(Platform)
            .execute();
        console.log(`✓ Deleted ${platformsDeleted.affected || 0} platforms`);

        console.log('Deleting Regions...');
        const regionsDeleted = await dataSource
            .createQueryBuilder()
            .delete()
            .from(Region)
            .execute();
        console.log(`✓ Deleted ${regionsDeleted.affected || 0} regions`);

        console.log('Deleting Hardware...');
        const hardwareDeleted = await dataSource
            .createQueryBuilder()
            .delete()
            .from(Hardware)
            .execute();
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

