import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    total_price: number

    @Column()
    quantity: number

    @ManyToOne(() => User, user => user.orders)
    user: User

    @ManyToMany(() => Product, product => product) 
    @JoinTable()
    products: Product[]
}