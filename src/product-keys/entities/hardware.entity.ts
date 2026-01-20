import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductPreset } from "./product-preset.entity";

@Entity('hardware')
export class Hardware {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToMany(() => ProductPreset, (productPreset) => productPreset.hardware)
    productPresets: ProductPreset[];

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}