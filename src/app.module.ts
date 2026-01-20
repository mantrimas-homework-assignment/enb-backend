import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleCloudStorageModule } from './clients/google-cloud-storage/google-cloud-storage.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, GoogleCloudStorageModule]
})
export class AppModule {}
