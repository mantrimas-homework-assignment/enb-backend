import { NotFoundException } from "@nestjs/common";
import { ProductListing } from "../entities/product-listing.entity";
import { ProductListingRepositoryInterface } from "../repositories/product-listing-repository.interface";
import { GetAllProductListingsUseCase } from "./usecases/get-all-product-listings.usecase";

export class GetAllProductListingsService implements GetAllProductListingsUseCase {
    constructor(
        private readonly productListingRepository: ProductListingRepositoryInterface
    ) {}

    async execute(): Promise<[ProductListing[], number]> {
        const productListingsAndCount = await this.productListingRepository.findAll()
        if (!productListingsAndCount) throw new NotFoundException('No existing product listings')

        return productListingsAndCount;           
    }
}