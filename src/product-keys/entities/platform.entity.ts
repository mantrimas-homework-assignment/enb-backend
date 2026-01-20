import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductPreset } from "./product-preset.entity";

@Entity('platforms')
export class Platform {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ProductPreset, (productPreset) => productPreset.platform)
    productPresets: ProductPreset[];

    @Column({ unique: true })
    name: string;

    @Column()
    iconKey: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}