import { Controller, Get, Inject, Query } from "@nestjs/common";
import { ProductListingsDiTokens } from "../di/product-listings-tokens.di";
import { GetAllProductListingsUseCase } from "../services/usecases/get-all-product-listings.usecase";
import { GetProductListingsByFuzzyNameUseCase } from "../services/usecases/get-product-listings-by-fuzzy-name.usecase";
import { ProductListingResponseDto } from "../dtos/product-listings-response.dto";
import { GoogleCloudStorageDiTokens } from "src/clients/google-cloud-storage/di/google-cloud-storage-tokens.di";
import { GetPublicFileUrlUseCase } from "src/clients/google-cloud-storage/services/usecases/get-public-file-url.usecase";

@Controller('product-listings')
export class ProductListingController {
    private readonly bucketName = process.env.GCS_BUCKET_NAME;

    constructor(
        @Inject(ProductListingsDiTokens.GetAllProductListingsService)
        private readonly getAllProductListingsService: GetAllProductListingsUseCase,
        @Inject(ProductListingsDiTokens.GetProductListingsByFuzzyNameService)
        private readonly getProductListingsByFuzzyNameService: GetProductListingsByFuzzyNameUseCase,
        @Inject(GoogleCloudStorageDiTokens.GetPublicFileUrlService)
        private readonly getPublicFileUrlService: GetPublicFileUrlUseCase
    ) {}

    @Get('list')
    async getProductListings(@Query('search') searchName?: string): Promise<ProductListingResponseDto> {
        const [productListings, count] = searchName
            ? await this.getProductListingsByFuzzyNameService.execute({ fuzzyName: searchName })
            : await this.getAllProductListingsService.execute();

        const mappedListings = await Promise.all(
            productListings.map(async (listing) => {
                const imageUrl = await this.getPublicFileUrlService.execute({
                    bucketName: this.bucketName,
                    fileName: listing.productPreset.imageUrlKey
                });

                const iconUrl = await this.getPublicFileUrlService.execute({
                    bucketName: this.bucketName,
                    fileName: listing.productPreset.platform.iconUrlKey
                });

                return {
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
                            iconUrl: iconUrl
                        },
                        game: {
                            name: listing.productPreset.game.name
                        },
                        imageUrl: imageUrl
                    },
                    price: listing.price,
                    cashback: listing.cashback,
                    discountedPrice: listing.discountedPrice,
                    likeCount: listing.likeCount
                };
            })
        );

        return {
            productListings: mappedListings,
            productListingCount: count
        };
    }
}