import { Module, Provider } from "@nestjs/common";
import { ProductListingsDiTokens } from "./di/product-listings-tokens.di";
import { ProductListing } from "./entities/product-listing.entity";
import { DataSource, Repository } from "typeorm";
import { DatabaseDiTokens } from "src/database/di/database-tokens.di";
import { ProductListingRepositoryInterface } from "./repositories/product-listing-repository.interface";
import { ProductListingRepository } from "./repositories/postgres/product-listing.repository";
import { GetAllProductListingsService } from "./services/get-all-product-listings.service";
import { GetProductListingsByFuzzyNameService } from "./services/get-product-listings-by-fuzzy-name.service";

const repositoryProviders: Array<Provider> = [
    {   
        provide: ProductListingsDiTokens.PostgresProductListingRepositoryInterface,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductListing),
        inject: [DatabaseDiTokens.PostgresDataSource]
    },
    {
        provide: ProductListingsDiTokens.ProductListingRepositoryInterface,
        useFactory: (repository: Repository<ProductListing>) => new ProductListingRepository(repository),
        inject: [ProductListingsDiTokens.PostgresProductListingRepositoryInterface]
    }
]

const serviceProviders: Array<Provider> = [
    {
        provide: ProductListingsDiTokens.GetAllProductListingsService,
        useFactory: (productListingRepository: ProductListingRepositoryInterface) => new GetAllProductListingsService(productListingRepository),
        inject: [ProductListingsDiTokens.ProductListingRepositoryInterface]
    },
    {
        provide: ProductListingsDiTokens.GetProductListingsByFuzzyNameService,
        useFactory: (productListingRepository: ProductListingRepositoryInterface) => new GetProductListingsByFuzzyNameService(productListingRepository),
        inject: [ProductListingsDiTokens.ProductListingRepositoryInterface]
    }
]

@Module({
    providers: [...serviceProviders, ...repositoryProviders]
})
export class ProductListingsModule {}