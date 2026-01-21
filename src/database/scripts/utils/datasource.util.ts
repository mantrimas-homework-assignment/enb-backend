import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { getDataSourceConfig } from '../../config/datasource.config';

config();

export function createDataSource(): DataSource {
    return new DataSource(getDataSourceConfig());
}

