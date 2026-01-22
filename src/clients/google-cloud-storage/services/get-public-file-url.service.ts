import { Storage } from '@google-cloud/storage';
import { GetPublicFileUrlPort, GetPublicFileUrlUseCase } from './usecases/get-public-file-url.usecase';

export class GetPublicFileUrlService implements GetPublicFileUrlUseCase {
  private readonly FALLBACK_URL_KEY = `${process.env.GCS_BUCKE}/not-found.png`;

  constructor(
    private readonly storage: Storage,
  ) {}

  async execute(payload: GetPublicFileUrlPort): Promise<string> {
    try {
      const { bucketName, fileName } = payload;

      if (!this.doesFileExist(bucketName, fileName)) {
        console.warn(`File ${fileName} does not exist in bucket ${bucketName}`);
        return this.getFallbackUrl();
      }

      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

      return publicUrl;
    } catch (error) {
      console.error(`Failed to get public URL: ${error.message}`);
      
      return this.getFallbackUrl();
    }
  }

  private async doesFileExist(bucketName: string, fileName: string): Promise<boolean> {
      const bucket = this.storage.bucket(bucketName);
      const file = bucket.file(fileName);

      const [exists] = await file.exists();
      
      return exists;
  }

  private getFallbackUrl() {
    return `https://storage.googleapis.com/${this.FALLBACK_URL_KEY}`
  }
}

