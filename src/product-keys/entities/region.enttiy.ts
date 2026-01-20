import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductPreset } from "./product-preset.entity";

@Entity('regions')
export class Region {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ProductPreset, (productPreset) => productPreset.region)
    productPresets: ProductPreset[];

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}