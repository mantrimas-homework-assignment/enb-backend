import { UseCase } from "src/common/usecase.common";
import { ProductListing } from "src/product-keys/entities/product-listing.entity";

export interface GetAllProductListingsUseCase extends UseCase<void, [ProductListing[], number]> {}