import { UseCase } from "src/common/usecase.common";

export type GetPublicFileUrlPort = {
    bucketName: string,
    fileName: string,
}

export interface GetPublicFileUrlUseCase extends UseCase<GetPublicFileUrlPort, string> {}

