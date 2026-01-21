import { Column, Entity, Generated, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductPreset } from "./product-preset.entity";

@Entity('product_listings')
export class ProductListing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    uuid: string;

    @ManyToOne(() => ProductPreset, (productPreset) => productPreset.productListings)
    @JoinColumn()
    @Index('idx_product_listing_product_preset_id')
    productPreset: ProductPreset;

    @Column({ name: 'price '})
    price: number;
    
    @Column({ name: 'cashback' })
    cashback: number;

    @Column({ name: 'discounted_price' })
    discountedPrice: number;

    @Column({ name: 'like_count' })
    likeCount: number;
}