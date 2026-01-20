import { UseCase } from "src/common/usecase.common";
import { Readable } from "stream";

export type UploadImagePort = {
    bucketName: string,
    fileName: string,
    fileStream: Readable,
    metadata?: {
        public?: boolean
    }
}

export interface UploadImageUseCase extends UseCase<UploadImagePort, string> {} 