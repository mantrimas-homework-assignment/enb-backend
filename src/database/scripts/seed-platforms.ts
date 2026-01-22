import { Platform } from '../../product-listings/entities/platform.entity';
import { createDataSource } from './utils/datasource.util';

const dataSource = createDataSource();

async function seedPlatforms() {
    try {
        console.log('Seeding Platforms...');
        await dataSource.initialize();

        const platformRepo = dataSource.getRepository(Platform);

        const platformData = [
            { name: 'Steam', iconUrlKey: 'platforms/steam.svg' },
            { name: 'Epic Games', iconUrlKey: 'platforms/epic.svg' },
            { name: 'GOG', iconUrlKey: 'platforms/gog.svg' },
            { name: 'PSN', iconUrlKey: 'platforms/playstation.svg' },
            { name: 'Xbox Live', iconUrlKey: 'platforms/xbox.svg' },
            { name: 'Nintendo', iconUrlKey: 'platforms/nintendo.svg' },
            { name: 'Origin', iconUrlKey: 'platforms/origin.svg' },
            { name: 'EA App', iconUrlKey: 'platforms/ea.svg' },
            { name: 'Rockstar Games Launcher', iconUrlKey: 'platforms/rockstar.svg' },
        ];

        await platformRepo.upsert(platformData, ['name']);

        const platforms = await platformRepo.find();
        console.log(`Successfully seeded ${platforms.length} platforms (upsert mode)`);
        
    } catch (error) {
        console.error('Error seeding platforms:', error);
        process.exit(1);
    } finally {
        await dataSource.destroy();
    }
}

seedPlatforms();

