import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Hardware } from "./hardware.entity";
import { Region } from "./region.entity";
import { Platform } from "./platform.entity";
import { Game } from "./game.entity";
import { ProductListing } from "./product-listing.entity";

@Entity('product_presets')
export class ProductPreset {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Hardware, (hardware) => hardware.productPresets)
    @JoinColumn()
    @Index('idx_product_preset_hardware_id')
    hardware: Hardware;

    @ManyToOne(() => Region, (region) => region.productPresets)
    @JoinColumn()
    @Index('idx_product_preset_region_id')
    region: Region;

    @ManyToOne(() => Platform, (platform) => platform.productPresets)
    @JoinColumn()
    @Index('idx_product_preset_platform_id')
    platform: Platform;

    @ManyToOne(() => Game, (game) => game.productPresets)
    @JoinColumn()
    @Index('idx_product_preset_game_id')
    game: Game;

    @OneToMany(() => ProductListing, (productListing) => productListing.productPreset)
    productListings: ProductListing[];
    
    @Column({ name: 'image_url_key' })
    imageUrlKey: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}