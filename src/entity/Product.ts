import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
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
    image: string

    @Column({ type: 'float', default: 0 })
    rating: number

    @Column({ default: 0 })
    buy_times: number

    @CreateDateColumn()
    created_at: Date

    @ManyToMany(() => Order, order => order.products) 
    orders: Order[]

    @ManyToMany(() => Category, category => category.products)
    @JoinTable()
    categories: Category[]
}