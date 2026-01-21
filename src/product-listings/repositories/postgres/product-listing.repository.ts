import { Repository } from "typeorm";
import { ProductListingRepositoryInterface, PaginationOptions, SearchOptions } from "../product-listing-repository.interface";
import { ProductListing } from "src/product-listings/entities/product-listing.entity";

export class ProductListingRepository implements ProductListingRepositoryInterface {
    private readonly SIMILARITY_THRESHOLD = 0.3;

    constructor(
        private readonly repository: Repository<ProductListing>
    ) {}

    async findAll(options?: PaginationOptions): Promise<[ProductListing[], number]> {
        const limit = options?.limit ?? 20;
        const offset = options?.offset ?? 0;

        const [results, totalCount] = await this.repository.findAndCount({
            relations: {
                productPreset: {
                    game: true,
                    hardware: true,
                    platform: true,
                    region: true
                }
            },
            take: limit,
            skip: offset,
        });

        return [results, totalCount];
    }

    async findByFuzzyGameName(payload: SearchOptions): Promise<[ProductListing[], number]> {
        const limit = payload.limit ?? 20;
        const offset = payload.offset ?? 0;
        const searchTerm = payload.searchTerm;

        const queryBuilder = this.repository
            .createQueryBuilder('productListing')
            .leftJoinAndSelect('productListing.productPreset', 'productPreset')
            .leftJoinAndSelect('productPreset.game', 'game')
            .leftJoinAndSelect('productPreset.hardware', 'hardware')
            .leftJoinAndSelect('productPreset.platform', 'platform')
            .leftJoinAndSelect('productPreset.region', 'region');

        queryBuilder.where(
            '(similarity(game.name, :searchTerm) > :threshold OR game.name ILIKE :searchPattern)',
            { 
                searchTerm: searchTerm.trim(),
                threshold: this.SIMILARITY_THRESHOLD,
                searchPattern: `%${searchTerm.trim()}%`
            }
        );

        queryBuilder
            .orderBy('similarity(game.name, :searchTerm)', 'DESC')
            .addOrderBy('game.name', 'ASC')
            .setParameter('searchTerm', searchTerm.trim())
            .take(limit)
            .skip(offset);

        return queryBuilder.getManyAndCount();
    }
}