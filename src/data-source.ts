import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category } from "./entity/Category"
import { Order } from "./entity/Order"
import { Product } from "./entity/Product"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "16072001",
    database: "food-delivery",
    synchronize: true,
    logging: false,
    entities: [User, Category, Order, Product],
    migrations: [],
    subscribers: [],
})
