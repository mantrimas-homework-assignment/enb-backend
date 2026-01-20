import { Storage } from '@google-cloud/storage';
import { UploadFilePort, UploadFileUseCase } from './usecases/upload-file.usecase';

export class UploadFileService implements UploadFileUseCase {
  constructor(
    private readonly storage: Storage,
  ) {}

  async execute(payload: UploadFilePort): Promise<string | null> {
    try {
      const { bucketName, fileName, fileStream, metadata } = payload;

      const bucket = this.storage.bucket(bucketName);
      const file = bucket.file(fileName);

      await file.save(fileStream);

      if (metadata?.public) {
        await file.makePublic();
        const fileUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        return fileUrl;
      }

      return null;
    } catch (error) {
      throw new Error(`Failed to upload file to Google Cloud Storage: ${error.message}`);
    }
  }
}
