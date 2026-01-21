import { Platform } from '../../product-listings/entities/platform.entity';
import { createDataSource } from './utils/datasource.util';

const dataSource = createDataSource();

async function seedPlatforms() {
    try {
        console.log('Seeding Platforms...');
        await dataSource.initialize();

        const platformRepo = dataSource.getRepository(Platform);
        
        await platformRepo.createQueryBuilder().delete().execute();

        const platformData = [
            { name: 'Steam', iconUrlKey: 'platforms/steam.png' },
            { name: 'Epic Games Store', iconUrlKey: 'platforms/epic.png' },
            { name: 'PlayStation Store', iconUrlKey: 'platforms/playstation.png' },
            { name: 'Xbox Store', iconUrlKey: 'platforms/xbox.png' },
            { name: 'Nintendo eShop', iconUrlKey: 'platforms/nintendo.png' },
            { name: 'GOG', iconUrlKey: 'platforms/gog.png' },
            { name: 'Origin', iconUrlKey: 'platforms/origin.png' },
            { name: 'Ubisoft Connect', iconUrlKey: 'platforms/ubisoft.png' },
            { name: 'Battle.net', iconUrlKey: 'platforms/battlenet.png' },
        ];

        const platforms = await platformRepo.save(platformData);
        console.log(`Successfully seeded ${platforms.length} platforms`);
        
    } catch (error) {
        console.error('Error seeding platforms:', error);
        process.exit(1);
    } finally {
        await dataSource.destroy();
    }
}

seedPlatforms();

