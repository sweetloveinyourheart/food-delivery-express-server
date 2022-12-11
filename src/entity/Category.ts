import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./Product"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    image: string

    @ManyToMany(() => Product, product => product.categories)
    products: Product[]
}