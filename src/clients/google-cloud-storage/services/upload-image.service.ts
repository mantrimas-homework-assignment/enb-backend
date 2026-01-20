import { Storage } from '@google-cloud/storage';
import { BadRequestException } from '@nestjs/common';
import { UploadImagePort, UploadImageUseCase } from './usecases/upload-image.usecase';

export class UploadImageService implements UploadImageUseCase {
  private readonly ALLOWED_IMAGE_EXTENSIONS = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
    '.svg',
    '.bmp',
    '.tiff',
    '.tif',
  ];

  constructor(
    private readonly storage: Storage,
  ) {}
  async execute(payload: UploadImagePort): Promise<string> {
    try {
      const { bucketName, fileName, fileStream, metadata } = payload;

      this.validateImageFile(fileName);

      const bucket = this.storage.bucket(bucketName);
      const file = bucket.file(fileName);

      await file.save(fileStream);

      if (metadata?.public) {
        await file.makePublic();
      }

      const filePath = `${bucketName}/${fileName}`;

      return filePath;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new Error(`Failed to upload file to Google Cloud Storage: ${error.message}`);
    }
  }

  private validateImageFile(fileName: string): void {
    const fileExtension = this.getFileExtension(fileName);
    
    if (!this.ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension)) {
      throw new BadRequestException(
        `Invalid file extension. Only image files are allowed. Received: ${fileExtension}`
      );
    }
  }

  private getFileExtension(fileName: string): string {
    const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    
    return fileExtension;
  }
}
