import "reflect-metadata"
import { DataSource } from "typeorm"

import { Category } from "./entity/Category"
import { Order } from "./entity/Order"
import { Product } from "./entity/Product"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "food-delivery",
    synchronize: true,
    logging: false,
    entities: [User, Category, Order, Product],
    migrations: [],
    subscribers: [],
})
