import { DataSourceOptions } from 'typeorm';
import { Platform } from '../../product-listings/entities/platform.entity';
import { Region } from '../../product-listings/entities/region.entity';
import { Game } from '../../product-listings/entities/game.entity';
import { Hardware } from '../../product-listings/entities/hardware.entity';
import { ProductPreset } from '../../product-listings/entities/product-preset.entity';
import { ProductListing } from '../../product-listings/entities/product-listing.entity';

export function getDataSourceConfig(): DataSourceOptions {
    return {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB_NAME,
        entities: [Platform, Region, Game, Hardware, ProductPreset, ProductListing],
        synchronize: true,
        logging: process.env.NODE_ENV === "development",
    };
}

