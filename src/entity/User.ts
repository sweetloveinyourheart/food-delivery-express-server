import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Order } from "./Order"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    email: string

    @Column()
    address: string

    @OneToMany(() => Order, orders => orders.user)
    orders: Order[]
}
