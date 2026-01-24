import { ProductListing } from "../entities/product-listing.entity";

export interface SearchOptions {
    searchTerm: string;
}

export interface ProductListingRepositoryInterface {
    findAll(): Promise<[ProductListing[] | null, number]>;
    findByFuzzyGameName(payload: SearchOptions): Promise<[ProductListing[] | null, number]>;
}