import { NotFoundException } from "@nestjs/common";
import { ProductListingRepositoryInterface } from "../repositories/product-listing-repository.interface";
import { GetProductListingsByFuzzyNamePort, GetProductListingsByFuzzyNameUseCase } from "./usecases/get-product-listings-by-fuzzy-name.usecase";

export class GetProductListingsByFuzzyNameService implements GetProductListingsByFuzzyNameUseCase {
    constructor(
        private readonly productListingRepository: ProductListingRepositoryInterface
    ) {}

    async execute(payload: GetProductListingsByFuzzyNamePort) {
        const { fuzzyName } = payload;

        const productListingsAndCount = await this.productListingRepository.findByFuzzyGameName({ searchTerm: fuzzyName });
        if (!productListingsAndCount) throw new NotFoundException('No existing product listings');
        
        return productListingsAndCount;
    }
}