import { Region } from '../../product-listings/entities/region.entity';
import { createDataSource } from './utils/datasource.util';

const dataSource = createDataSource();

async function seedRegions() {
    try {
        console.log('Seeding Regions...');
        await dataSource.initialize();

        const regionRepo = dataSource.getRepository(Region);
        
        await regionRepo.createQueryBuilder().delete().execute();

        const regionData = [
            { name: 'North America' },
            { name: 'Europe' },
            { name: 'Asia' },
            { name: 'South America' },
            { name: 'Oceania' },
            { name: 'Africa' },
            { name: 'Global' },
        ];

        const regions = await regionRepo.save(regionData);
        console.log(`Successfully seeded ${regions.length} regions`);
        
    } catch (error) {
        console.error('Error seeding regions:', error);
        process.exit(1);
    } finally {
        await dataSource.destroy();
    }
}

seedRegions();

