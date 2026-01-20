import { GoogleCloudStorageDiTokens } from "./di/google-cloud-storage-tokens.di";
import { googleCloudStorageProviders } from "./providers/google-cloud-storage.provider";
import { Global, Module, Provider } from "@nestjs/common";
import { Storage } from '@google-cloud/storage';
import { UploadFileService } from "./services/upload-file.service";

const serviceProviders: Array<Provider> = [
    {
        provide: GoogleCloudStorageDiTokens.UploadFileService,
        useFactory:(googleCloudStorage: Storage) => new UploadFileService(googleCloudStorage),
        inject: [GoogleCloudStorageDiTokens.GoogleCloudStorageProvider]
    }
];

@Global()
@Module({
    providers: [...googleCloudStorageProviders, ...serviceProviders],
    exports: [...googleCloudStorageProviders]
})
export class GoogleCloudStorageModule {}