import { Hardware } from '../../product-listings/entities/hardware.entity';
import { Region } from '../../product-listings/entities/region.entity';
import { Platform } from '../../product-listings/entities/platform.entity';
import { Game } from '../../product-listings/entities/game.entity';
import { ProductPreset } from '../../product-listings/entities/product-preset.entity';
import { createDataSource } from './utils/datasource.util';

const dataSource = createDataSource();

async function seedProductPresets() {
    try {
        console.log('Seeding Product Presets...');
        await dataSource.initialize();

        const productPresetRepo = dataSource.getRepository(ProductPreset);
        const hardwareRepo = dataSource.getRepository(Hardware);
        const regionRepo = dataSource.getRepository(Region);
        const platformRepo = dataSource.getRepository(Platform);
        const gameRepo = dataSource.getRepository(Game);

        const hardware = await hardwareRepo.find();
        const regions = await regionRepo.find();
        const platforms = await platformRepo.find();
        const games = await gameRepo.find();

        if (hardware.length === 0 || regions.length === 0 || platforms.length === 0 || games.length === 0) {
            console.error('Please seed Hardware, Regions, Platforms, and Games first!');
            process.exit(1);
        }

        await productPresetRepo.createQueryBuilder().delete().execute();

        const productPresets = [];

        for (const game of games) {
            const numPresets = Math.floor(Math.random() * 2) + 2;
            
            for (let j = 0; j < numPresets; j++) {
                const preset = productPresetRepo.create({
                    hardware: hardware[Math.floor(Math.random() * hardware.length)],
                    region: regions[Math.floor(Math.random() * regions.length)],
                    platform: platforms[Math.floor(Math.random() * platforms.length)],
                    game: game,
                    imageUrlKey: `products/${game.name.toLowerCase().replace(/\s+/g, '-')}-${j}.jpg`,
                });
                productPresets.push(preset);
            }
        }

        const savedPresets = await productPresetRepo.save(productPresets);
        console.log(`Successfully seeded ${savedPresets.length} product presets`);
        
    } catch (error) {
        console.error('Error seeding product presets:', error);
        process.exit(1);
    } finally {
        await dataSource.destroy();
    }
}

seedProductPresets();

