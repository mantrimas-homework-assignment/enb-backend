import { Hardware } from '../../product-listings/entities/hardware.entity';
import { createDataSource } from './utils/datasource.util';

const dataSource = createDataSource();

async function seedHardware() {
    try {
        console.log('Seeding Hardware...');
        await dataSource.initialize();

        const hardwareRepo = dataSource.getRepository(Hardware);

        const hardwareData = [
            { name: 'PC' },
            { name: 'PlayStation 5' },
            { name: 'Xbox Series X' },
            { name: 'Nintendo Switch' },
            { name: 'Mobile' },
            { name: 'PlayStation 4' },
            { name: 'Xbox One' },
            { name: 'Nintendo 3DS' },
        ];

        await hardwareRepo.upsert(hardwareData, ['name']);

        const hardware = await hardwareRepo.find();
        console.log(`Successfully seeded ${hardware.length} hardware items (upsert mode)`);
        
    } catch (error) {
        console.error('Error seeding hardware:', error);
        process.exit(1);
    } finally {
        await dataSource.destroy();
    }
}

seedHardware();

