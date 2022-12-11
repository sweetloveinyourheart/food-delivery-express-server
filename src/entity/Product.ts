import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Order } from "./Order";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: string

    @Column()
    images: string

    @Column({ type: 'float' })
    rating: number

    @Column()
    buy_times: number

    @CreateDateColumn()
    created_at: Date

    @ManyToMany(() => Order, order => order.product) 
    order: Order

    @ManyToMany(() => Category, category => category.product)
    category: Category
}