import { Game } from '../../product-listings/entities/game.entity';
import { createDataSource } from './utils/datasource.util';

const dataSource = createDataSource();

async function seedGames() {
    try {
        console.log('Seeding Games...');
        await dataSource.initialize();

        const gameRepo = dataSource.getRepository(Game);
        
        await gameRepo.createQueryBuilder().delete().execute();

        const gameData = [
            { name: 'The Legend of Zelda: Breath of the Wild' },
            { name: 'Elden Ring' },
            { name: 'Cyberpunk 2077' },
            { name: 'Red Dead Redemption 2' },
            { name: 'God of War' },
            { name: 'Baldur\'s Gate 3' },
            { name: 'Hogwarts Legacy' },
            { name: 'Final Fantasy XVI' },
            { name: 'Street Fighter 6' },
            { name: 'Starfield' },
            { name: 'The Witcher 3: Wild Hunt' },
            { name: 'Grand Theft Auto V' },
            { name: 'Minecraft' },
            { name: 'Fortnite' },
            { name: 'Call of Duty: Modern Warfare III' },
        ];

        const games = await gameRepo.save(gameData);
        console.log(`Successfully seeded ${games.length} games`);
        
    } catch (error) {
        console.error('Error seeding games:', error);
        process.exit(1);
    } finally {
        await dataSource.destroy();
    }
}

seedGames();

