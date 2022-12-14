import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Product } from '../entity/Product'
import { Category } from '../entity/Category'

export class ProductController {
    constructor(
        private productRepository = AppDataSource.getRepository(Product),
        private categoryRepository = AppDataSource.getRepository(Category)
    ) {
        this.newProduct = this.newProduct.bind(this)
        this.getProduct = this.getProduct.bind(this)
    }

    async newProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, image, price, category_id } = req.body;

            const category = await this.categoryRepository.findOneBy({ id: category_id })

            const product = Object.assign(new Product(), {
                name,
                image,
                price,
                categories: [category]
            })

            const newProduct = await this.productRepository.save(product)

            return res.status(201).json({
                data: newProduct,
                error: null
            })

        } catch (error) {
            return res.status(400).json({
                data: null,
                error: 'Cannot create product !'
            })
        }
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.productRepository.find({ relations: ['categories'] })
            return res.status(200).json({
                data,
                error: null
            })
        } catch (error) {
            return res.status(404).json({
                data: null,
                error: 'Cannot get any categories !'
            })
        }
    }
}