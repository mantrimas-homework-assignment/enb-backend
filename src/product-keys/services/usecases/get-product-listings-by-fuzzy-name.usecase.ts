import { UseCase } from "src/common/usecase.common";
import { ProductListing } from "src/product-keys/entities/product-listing.entity";

export type GetProductListingsByFuzzyNamePort = {
    fuzzyName: string;
}

export interface GetProductListingsByFuzzyNameUseCase extends UseCase<GetProductListingsByFuzzyNamePort, [ProductListing[], number]> {}