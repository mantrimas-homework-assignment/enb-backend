import { UseCase } from "src/common/usecase.common";
import { Readable } from "stream";

export type UploadFilePort = {
    bucketName: string,
    fileName: string,
    fileStream: Readable,
}

export interface UploadFileUseCase extends UseCase<UploadFilePort, string> {} 