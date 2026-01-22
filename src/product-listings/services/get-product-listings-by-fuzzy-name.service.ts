import { NotFoundException } from "@nestjs/common";
import { ProductListingRepositoryInterface } from "../repositories/product-listing-repository.interface";
import { GetProductListingsByFuzzyNamePort, GetProductListingsByFuzzyNameUseCase } from "./usecases/get-product-listings-by-fuzzy-name.usecase";
import { ProductListing } from "../entities/product-listing.entity";

export class GetProductListingsByFuzzyNameService implements GetProductListingsByFuzzyNameUseCase {
    constructor(
        private readonly productListingRepository: ProductListingRepositoryInterface
    ) {}

    async execute(payload: GetProductListingsByFuzzyNamePort): Promise<[ProductListing[], number]> {
        const { fuzzyName } = payload;

        const [productListings, productListingsCount] = await this.productListingRepository.findByFuzzyGameName({ searchTerm: fuzzyName });
        if (!productListings) throw new NotFoundException('No existing product listings');
        
        return [productListings, productListingsCount];
    }
}