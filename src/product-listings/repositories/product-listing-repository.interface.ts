import { ProductListing } from "../entities/product-listing.entity";

export interface PaginationOptions {
    limit?: number;
    offset?: number;
}

export interface SearchOptions extends PaginationOptions {
    searchTerm: string;
}

export interface ProductListingRepositoryInterface {
    findAll(options?: PaginationOptions): Promise<[ProductListing[] | null, number]>;
    findByFuzzyGameName(payload: SearchOptions): Promise<[ProductListing[] | null, number]>;
}