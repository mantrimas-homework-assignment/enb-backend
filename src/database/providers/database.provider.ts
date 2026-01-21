import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { DatabaseDiTokens } from "../di/database-tokens.di";
import { getDataSourceConfig } from "../config/datasource.config";

export const databaseProviders: Array<Provider> = [
    {
        provide: DatabaseDiTokens.PostgresDataSource,
        useFactory: async () => {
            const dataSource: DataSource = new DataSource(getDataSourceConfig());

            await dataSource.initialize();

            await dataSource.query('CREATE EXTENSION IF NOT EXISTS pg_trgm');

            return dataSource;
        }
    }
]
