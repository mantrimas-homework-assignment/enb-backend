import { GoogleCloudStorageDiTokens } from "./di/google-cloud-storage-tokens.di";
import { googleCloudStorageProviders } from "./providers/google-cloud-storage.provider";
import { Global, Module, Provider } from "@nestjs/common";
import { Storage } from '@google-cloud/storage';
import { UploadImageService } from "./services/upload-image.service";
import { GetPublicFileUrlService } from "./services/get-public-file-url.service";

const serviceProviders: Array<Provider> = [
    {
        provide: GoogleCloudStorageDiTokens.UploadFileService,
        useFactory:(googleCloudStorage: Storage) => new UploadImageService(googleCloudStorage),
        inject: [GoogleCloudStorageDiTokens.GoogleCloudStorageProvider]
    },
    {
        provide: GoogleCloudStorageDiTokens.GetPublicFileUrlService,
        useFactory:(googleCloudStorage: Storage) => new GetPublicFileUrlService(googleCloudStorage),
        inject: [GoogleCloudStorageDiTokens.GoogleCloudStorageProvider]
    }
];

@Global()
@Module({
    providers: [...googleCloudStorageProviders, ...serviceProviders],
    exports: [...googleCloudStorageProviders, ...serviceProviders]
})
export class GoogleCloudStorageModule {}