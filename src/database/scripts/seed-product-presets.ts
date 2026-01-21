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

        const pc = await hardwareRepo.findOne({ where: { name: 'PC' } });
        const ps5 = await hardwareRepo.findOne({ where: { name: 'PlayStation 5' } });
        const xboxSeriesX = await hardwareRepo.findOne({ where: { name: 'Xbox Series X' } });
        const nintendoSwitch = await hardwareRepo.findOne({ where: { name: 'Nintendo Switch' } });

        const northAmerica = await regionRepo.findOne({ where: { name: 'North America' } });
        const europe = await regionRepo.findOne({ where: { name: 'Europe' } });
        const global = await regionRepo.findOne({ where: { name: 'Global' } });

        const steam = await platformRepo.findOne({ where: { name: 'Steam' } });
        const epicGames = await platformRepo.findOne({ where: { name: 'Epic Games Store' } });
        const playstationStore = await platformRepo.findOne({ where: { name: 'PlayStation Store' } });
        const xboxStore = await platformRepo.findOne({ where: { name: 'Xbox Store' } });
        const nintendoEshop = await platformRepo.findOne({ where: { name: 'Nintendo eShop' } });

        const eldenRing = await gameRepo.findOne({ where: { name: 'Elden Ring' } });
        const cyberpunk = await gameRepo.findOne({ where: { name: 'Cyberpunk 2077' } });
        const zelda = await gameRepo.findOne({ where: { name: 'The Legend of Zelda: Breath of the Wild' } });
        const godOfWar = await gameRepo.findOne({ where: { name: 'God of War' } });

        if (!pc || !ps5 || !xboxSeriesX || !nintendoSwitch || !northAmerica || !europe || !global || 
            !steam || !epicGames || !playstationStore || !xboxStore || !nintendoEshop ||
            !eldenRing || !cyberpunk || !zelda || !godOfWar) {
            console.error('Please seed Hardware, Regions, Platforms, and Games first!');
            process.exit(1);
        }

        const existingCount = await productPresetRepo.count();
        
        if (existingCount > 0) {
            console.log(`Product Presets already seeded (${existingCount} records). Skipping...`);
            return;
        }

        const productPresets = [
            { hardware: pc, region: global, platform: steam, game: eldenRing, imageUrlKey: 'products/elden-ring-pc-steam.jpg' },
            { hardware: pc, region: global, platform: epicGames, game: eldenRing, imageUrlKey: 'products/elden-ring-pc-epic.jpg' },
            { hardware: ps5, region: northAmerica, platform: playstationStore, game: eldenRing, imageUrlKey: 'products/elden-ring-ps5-na.jpg' },
            { hardware: xboxSeriesX, region: northAmerica, platform: xboxStore, game: eldenRing, imageUrlKey: 'products/elden-ring-xbox-na.jpg' },
            
            { hardware: pc, region: global, platform: steam, game: cyberpunk, imageUrlKey: 'products/cyberpunk-pc-steam.jpg' },
            { hardware: pc, region: global, platform: epicGames, game: cyberpunk, imageUrlKey: 'products/cyberpunk-pc-epic.jpg' },
            { hardware: ps5, region: northAmerica, platform: playstationStore, game: cyberpunk, imageUrlKey: 'products/cyberpunk-ps5-na.jpg' },
            { hardware: xboxSeriesX, region: europe, platform: xboxStore, game: cyberpunk, imageUrlKey: 'products/cyberpunk-xbox-eu.jpg' },
            
            { hardware: nintendoSwitch, region: northAmerica, platform: nintendoEshop, game: zelda, imageUrlKey: 'products/zelda-switch-na.jpg' },
            { hardware: nintendoSwitch, region: europe, platform: nintendoEshop, game: zelda, imageUrlKey: 'products/zelda-switch-eu.jpg' },
            
            { hardware: ps5, region: northAmerica, platform: playstationStore, game: godOfWar, imageUrlKey: 'products/god-of-war-ps5-na.jpg' },
            { hardware: ps5, region: europe, platform: playstationStore, game: godOfWar, imageUrlKey: 'products/god-of-war-ps5-eu.jpg' },
            { hardware: pc, region: global, platform: steam, game: godOfWar, imageUrlKey: 'products/god-of-war-pc-steam.jpg' },
        ];

        const savedPresets = await productPresetRepo.save(productPresets);
        console.log(`Successfully seeded ${savedPresets.length} product presets (upsert mode)`);
        
    } catch (error) {
        console.error('Error seeding product presets:', error);
        process.exit(1);
    } finally {
        await dataSource.destroy();
    }
}

seedProductPresets();
