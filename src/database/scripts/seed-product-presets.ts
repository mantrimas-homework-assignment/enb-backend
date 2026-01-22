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
        const ps4 = await hardwareRepo.findOne({ where: { name: 'PlayStation 4' } });
        const xboxSeriesX = await hardwareRepo.findOne({ where: { name: 'Xbox Series X' } });
        const xboxOne = await hardwareRepo.findOne({ where: { name: 'Xbox One' } });
        const nintendoSwitch = await hardwareRepo.findOne({ where: { name: 'Nintendo Switch' } });
        const nintendoSwitch2 = await hardwareRepo.findOne({ where: { name: 'Nintendo Switch 2' } });

        const northAmerica = await regionRepo.findOne({ where: { name: 'North America' } });
        const europe = await regionRepo.findOne({ where: { name: 'Europe' } });
        const global = await regionRepo.findOne({ where: { name: 'Global' } });

        const steam = await platformRepo.findOne({ where: { name: 'Steam' } });
        const epicGames = await platformRepo.findOne({ where: { name: 'Epic Games' } });
        const gog = await platformRepo.findOne({ where: { name: 'GOG' } });
        const playstationStore = await platformRepo.findOne({ where: { name: 'PSN' } });
        const xboxStore = await platformRepo.findOne({ where: { name: 'Xbox Live' } });
        const nintendoEshop = await platformRepo.findOne({ where: { name: 'Nintendo' } });
        const origin = await platformRepo.findOne({ where: { name: 'Origin' } });
        const rockstarLauncher = await platformRepo.findOne({ where: { name: 'Rockstar Games Launcher' } });
        const eaApp = await platformRepo.findOne({ where: { name: 'EA App' } });

        const eldenRing = await gameRepo.findOne({ where: { name: 'Elden Ring' } });
        const cyberpunk = await gameRepo.findOne({ where: { name: 'Cyberpunk 2077' } });
        const godOfWar = await gameRepo.findOne({ where: { name: 'God of War' } });
        const splitFiction = await gameRepo.findOne({ where: { name: 'Split Fiction' } });
        const rdr2 = await gameRepo.findOne({ where: { name: 'Red Dead Redemption 2' } });
        const fifa23 = await gameRepo.findOne({ where: { name: 'FIFA 23' } });

        if (!pc || !ps5 || !ps4 || !xboxSeriesX || !xboxOne || !nintendoSwitch || !nintendoSwitch2 || !northAmerica || !europe || !global ||
            !steam || !epicGames || !gog || !playstationStore || !xboxStore || !nintendoEshop || !origin || !rockstarLauncher || !eaApp ||
            !eldenRing || !cyberpunk || !godOfWar || !splitFiction || !rdr2 || !fifa23) {
            console.error('Please seed Hardware, Regions, Platforms, and Games first!');
            process.exit(1);
        }

        const productPresets = [
            { hardware: pc, region: global, platform: steam, game: eldenRing, imageUrlKey: 'products/elden-ring-pc.jpg' },
            { hardware: pc, region: northAmerica, platform: xboxStore, game: eldenRing, imageUrlKey: 'products/elden-ring-xbox-pc.png' },
            
            { hardware: pc, region: global, platform: steam, game: cyberpunk, imageUrlKey: 'products/cyberpunk.jpg' },
            { hardware: pc, region: global, platform: gog, game: cyberpunk, imageUrlKey: 'products/cyberpunk.jpg' },
            { hardware: pc, region: europe, platform: xboxStore, game: cyberpunk, imageUrlKey: 'products/cyberpunk-xbox.jpg' },
            
            { hardware: ps4, region: northAmerica, platform: playstationStore, game: godOfWar, imageUrlKey: 'products/god-of-war-ps4.jpg' },
            { hardware: ps4, region: europe, platform: playstationStore, game: godOfWar, imageUrlKey: 'products/god-of-war-ps4.jpg' },
            { hardware: pc, region: global, platform: steam, game: godOfWar, imageUrlKey: 'products/god-of-war.jpg' },
            
            { hardware: pc, region: global, platform: steam, game: splitFiction, imageUrlKey: 'products/split-fiction.jpg' },
            { hardware: pc, region: global, platform: epicGames, game: splitFiction, imageUrlKey: 'products/split-fiction.jpg' },
            { hardware: pc, region: global, platform: eaApp, game: splitFiction, imageUrlKey: 'products/split-fiction.jpg' },
            { hardware: xboxSeriesX, region: northAmerica, platform: xboxStore, game: splitFiction, imageUrlKey: 'products/split-fiction.jpg' },
            { hardware: xboxSeriesX, region: europe, platform: xboxStore, game: splitFiction, imageUrlKey: 'products/split-fiction.jpg' },
            { hardware: nintendoSwitch2, region: northAmerica, platform: nintendoEshop, game: splitFiction, imageUrlKey: 'products/split-fiction-switch-2.jpg' },
            { hardware: nintendoSwitch2, region: europe, platform: nintendoEshop, game: splitFiction, imageUrlKey: 'products/split-fiction-switch-2.jpg' },
            
            { hardware: pc, region: global, platform: steam, game: rdr2, imageUrlKey: 'products/rdr2.jpg' },
            { hardware: pc, region: global, platform: epicGames, game: rdr2, imageUrlKey: 'products/rdr2.jpg' },
            { hardware: pc, region: global, platform: rockstarLauncher, game: rdr2, imageUrlKey: 'products/rdr2.jpg' },
            { hardware: ps4, region: northAmerica, platform: playstationStore, game: rdr2, imageUrlKey: 'products/rdr2-ps4.jpg' },
            { hardware: ps4, region: europe, platform: playstationStore, game: rdr2, imageUrlKey: 'products/rdr2-ps4.jpg' },
            { hardware: xboxOne, region: northAmerica, platform: xboxStore, game: rdr2, imageUrlKey: 'products/rdr2-xbox-one.jpg' },
            { hardware: xboxOne, region: europe, platform: xboxStore, game: rdr2, imageUrlKey: 'products/rdr2-xbox-one.jpg' },
            
            { hardware: pc, region: global, platform: steam, game: fifa23, imageUrlKey: 'products/fifa-23.jpg' },
            { hardware: pc, region: global, platform: origin, game: fifa23, imageUrlKey: 'products/fifa-23-origin.jpg' },
            { hardware: ps5, region: europe, platform: playstationStore, game: fifa23, imageUrlKey: 'products/fifa-23-ps5.jpg' },
            { hardware: xboxOne, region: northAmerica, platform: xboxStore, game: fifa23, imageUrlKey: 'products/fifa-23-xbox-one.jpg' },
            { hardware: xboxOne, region: europe, platform: xboxStore, game: fifa23, imageUrlKey: 'products/fifa-23-xbox-one.jpg' },
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
