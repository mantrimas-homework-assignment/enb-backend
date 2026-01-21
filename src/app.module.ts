import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleCloudStorageModule } from './clients/google-cloud-storage/google-cloud-storage.module';
import { ProductListingsModule } from './product-listings/product-listings.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, GoogleCloudStorageModule, ProductListingsModule]
})
export class AppModule {}
