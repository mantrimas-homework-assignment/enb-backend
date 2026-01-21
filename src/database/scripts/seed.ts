import { execSync } from 'child_process';
import { config } from 'dotenv';

config();

async function seedAll() {
    console.log('Starting complete database seeding...');
    console.log('');

    try {
        console.log('Phase 1: Seeding base entities...');
        execSync('npm run seed:hardware', { stdio: 'inherit' });
        execSync('npm run seed:regions', { stdio: 'inherit' });
        execSync('npm run seed:platforms', { stdio: 'inherit' });
        execSync('npm run seed:games', { stdio: 'inherit' });
        console.log('');

        console.log('Phase 2: Seeding product presets...');
        execSync('npm run seed:product-presets', { stdio: 'inherit' });
        console.log('');

        console.log('Phase 3: Seeding product listings...');
        execSync('npm run seed:product-listings', { stdio: 'inherit' });
        console.log('');

        console.log('Complete database seeding finished successfully!');
    } catch (error) {
        console.error('Error during seeding process:', error.message);
        process.exit(1);
    }
}

seedAll();

