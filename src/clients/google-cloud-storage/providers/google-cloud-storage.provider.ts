import { Provider } from "@nestjs/common";
import { Storage } from '@google-cloud/storage';
import { GoogleCloudStorageDiTokens } from "../di/google-cloud-storage-tokens.di";

export const googleCloudStorageProviders: Array<Provider> = [
    {
        provide: GoogleCloudStorageDiTokens.GoogleCloudStorageProvider,
        useFactory: () => {
            const googleCloudStorage = new Storage({
                credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS),
                projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
            });

            return googleCloudStorage;
        }
    }
]