import { Storage } from '@google-cloud/storage';
import { GetPublicFileUrlPort, GetPublicFileUrlUseCase } from './usecases/get-public-file-url.usecase';
import { NotFoundException } from '@nestjs/common';

export class GetPublicFileUrlService implements GetPublicFileUrlUseCase {
  constructor(
    private readonly storage: Storage,
  ) {}

  async execute(payload: GetPublicFileUrlPort): Promise<string> {
    try {
      const { bucketName, fileName } = payload;

      const bucket = this.storage.bucket(bucketName);
      const file = bucket.file(fileName);

      const [exists] = await file.exists();
      if (!exists) {
        throw new NotFoundException(`File ${fileName} does not exist in bucket ${bucketName}`);
      }

      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

      return publicUrl;
    } catch (error) {
      throw new Error(`Failed to get public URL from Google Cloud Storage: ${error.message}`);
    }
  }
}

