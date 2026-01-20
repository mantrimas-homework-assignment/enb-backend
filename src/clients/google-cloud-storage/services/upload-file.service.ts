import { Storage } from '@google-cloud/storage';
import { UploadFilePort, UploadFileUseCase } from './usecases/upload-file.usecase';

export class UploadFileService implements UploadFileUseCase {
  constructor(
    private readonly storage: Storage,
  ) {}

  async execute(payload: UploadFilePort): Promise<string> {
    try {
      const { bucketName, fileName, fileStream } = payload;

      const bucket = this.storage.bucket(bucketName);
      const file = bucket.file(fileName);

      await file.save(fileStream);

      const fileUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

      return fileUrl;
    } catch (error) {
      throw new Error(`Failed to upload file to Google Cloud Storage: ${error.message}`);
    }
  }
}
