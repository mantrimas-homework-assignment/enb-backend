import { Controller, Inject, Query } from "@nestjs/common";
import { ProductListingsDiTokens } from "../di/product-listings-tokens.di";
import { GetAllProductListingsUseCase } from "../services/usecases/get-all-product-listings.usecase";
import { GetProductListingsByFuzzyNameUseCase } from "../services/usecases/get-product-listings-by-fuzzy-name.usecase";
import { ProductListingResponseDto } from "../dtos/product-listings-response.dto";

@Controller('product-listings')
export class ProductListingController {
    constructor(
        @Inject(ProductListingsDiTokens.GetAllProductListingsService)
        private readonly getAllProductListingsService: GetAllProductListingsUseCase,
        @Inject(ProductListingsDiTokens.GetProductListingsByFuzzyNameService)
        private readonly getProductListingsByFuzzyNameService: GetProductListingsByFuzzyNameUseCase
    ) {}

    async getAllProductListings(): Promise<ProductListingResponseDto> {
        const [productListings, count] = await this.getAllProductListingsService.execute();
        
        return {
            productListing: productListings.map((listing) => ({
                uuid: listing.uuid,
                productPreset: {
                    hardware: {
                        name: listing.productPreset.hardware.name
                    },
                    region: {
                        name: listing.productPreset.region.name
                    },
                    platform: {
                        name: listing.productPreset.platform.name,
                        iconUrlKey: listing.productPreset.platform.iconUrlKey
                    },
                    game: {
                        name: listing.productPreset.game.name
                    },
                    imageUrlKey: listing.productPreset.imageUrlKey
                },
                price: listing.price,
                cashback: listing.cashback,
                discountedPrice: listing.discountedPrice,
                likeCount: listing.likeCount
            })),
            productListingCount: count
        };
    }

    async getProductListingsByFuzzyName(@Query('search') searchName: string): Promise<ProductListingResponseDto> {
        const [productListings, count] = await this.getProductListingsByFuzzyNameService.execute({ fuzzyName: searchName });

        return {
            productListing: productListings.map((listing) => ({
                uuid: listing.uuid,
                productPreset: {
                    hardware: {
                        name: listing.productPreset.hardware.name
                    },
                    region: {
                        name: listing.productPreset.region.name
                    },
                    platform: {
                        name: listing.productPreset.platform.name,
                        iconUrlKey: listing.productPreset.platform.iconUrlKey
                    },
                    game: {
                        name: listing.productPreset.game.name
                    },
                    imageUrlKey: listing.productPreset.imageUrlKey
                },
                price: listing.price,
                cashback: listing.cashback,
                discountedPrice: listing.discountedPrice,
                likeCount: listing.likeCount
            })),
            productListingCount: count
        };
    }
}