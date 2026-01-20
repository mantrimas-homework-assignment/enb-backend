import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { DatabaseDiTokens } from "../di/database-tokens.di";
import { Platform } from "src/product-keys/entities/platform.entity";
import { Region } from "src/product-keys/entities/region.enttiy";

export const databaseProviders: Array<Provider> = [
    {
        provide: DatabaseDiTokens.PostgresDataSource,
        useFactory: () => {
            const dataSource: DataSource = new DataSource({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB_NAME,
                entities: [Platform, Region],
                synchronize: true,
                logging: process.env.NODE_ENV === "development",
            });

            return dataSource.initialize();
        }
    }
]
