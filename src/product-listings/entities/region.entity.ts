import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductPreset } from "./product-preset.entity";

@Entity('regions')
export class Region {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ProductPreset, (productPreset) => productPreset.region)
    productPresets: ProductPreset[];

    @Column({ unique: true, name: 'name' })
    name: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}