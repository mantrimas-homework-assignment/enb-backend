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
        url: process.env.DATABASE_URL,
        entities: [Platform, Region, Game, Hardware, ProductPreset, ProductListing],
        synchronize: true,
        logging: process.env.NODE_ENV === "development",
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false} : false,
    };
}

