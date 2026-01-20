import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Hardware } from "./hardware.entity";
import { Region } from "./region.enttiy";
import { Platform } from "./platform.entity";
import { Game } from "./game.entity";

@Entity('product_preset')
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
    
    @Column()
    imageKey: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}