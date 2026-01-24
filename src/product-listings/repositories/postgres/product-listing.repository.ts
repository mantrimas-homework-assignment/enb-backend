import { Repository } from "typeorm";
import { ProductListingRepositoryInterface, SearchOptions } from "../product-listing-repository.interface";
import { ProductListing } from "src/product-listings/entities/product-listing.entity";

export class ProductListingRepository implements ProductListingRepositoryInterface {
    private readonly SIMILARITY_THRESHOLD = 0.1;

    constructor(
        private readonly repository: Repository<ProductListing>
    ) {}

    async findAll(): Promise<[ProductListing[] | null, number]> {
        const [results, totalCount] = await this.repository.findAndCount({
            relations: {
                productPreset: {
                    game: true,
                    hardware: true,
                    platform: true,
                    region: true
                }
            }
        });

        return [results, totalCount];
    }

    async findByFuzzyGameName(payload: SearchOptions): Promise<[ProductListing[] | null, number]> {
        const searchTerm = payload.searchTerm;

        const queryBuilder = this.repository
            .createQueryBuilder('productListing')
            .leftJoinAndSelect('productListing.productPreset', 'productPreset')
            .leftJoinAndSelect('productPreset.game', 'game')
            .leftJoinAndSelect('productPreset.hardware', 'hardware')
            .leftJoinAndSelect('productPreset.platform', 'platform')
            .leftJoinAndSelect('productPreset.region', 'region');

        queryBuilder
            .addSelect('similarity(game.name, :searchTerm)', 'name_similarity')
            .where(
                '(similarity(game.name, :searchTerm) > :threshold OR game.name ILIKE :searchPattern)',
                { 
                    searchTerm: searchTerm.trim(),
                    threshold: this.SIMILARITY_THRESHOLD,
                    searchPattern: `%${searchTerm.trim()}%`
                }
            );

        queryBuilder
            .orderBy('name_similarity', 'DESC')
            .addOrderBy('game.name', 'ASC')

        return queryBuilder.getManyAndCount();
    }
}