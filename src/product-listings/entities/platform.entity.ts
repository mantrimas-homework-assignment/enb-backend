import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductPreset } from "./product-preset.entity";

@Entity('platforms')
export class Platform {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ProductPreset, (productPreset) => productPreset.platform)
    productPresets: ProductPreset[];

    @Column({ unique: true, name: 'name' })
    name: string;

    @Column({ name: 'icon_url_key' })
    iconUrlKey: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}