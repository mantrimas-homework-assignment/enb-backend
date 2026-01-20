import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
    hardware: Hardware;

    @ManyToOne(() => Region, (region) => region.productPresets)
    @JoinColumn()
    region: Region;

    @ManyToOne(() => Platform, (platform) => platform.productPresets)
    @JoinColumn()
    platform: Platform;

    @ManyToOne(() => Game, (game) => game.productPresets)
    @JoinColumn()
    game: Game;
    
}