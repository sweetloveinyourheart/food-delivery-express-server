import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Product } from '../entity/Product'
import { Res } from '..'
import { Category } from '../entity/Category'

export class ProductController {

    private productRepository = AppDataSource.getRepository(Product)
    private categoryRepository = AppDataSource.getRepository(Category)

    async newProduct(req: Request, res: Response, next: NextFunction): Promise<Res> {
        try {
            const { name, image, price, category_id } = req.body;

            const category = await this.categoryRepository.findOneBy({id: category_id})

            const product = Object.assign(new Product(), {
                name,
                image,
                price,
                categories: [category]
            })

            const newProduct = await this.productRepository.save(product)

            return {
                data: newProduct,
                error: null,
                status: 201
            }

        } catch (error) {
            return {
                data: null,
                error: "Has error !",
                status: 400
            }
        }
    }

    async getProduct(req: Request, res: Response, next: NextFunction): Promise<Res> {
        try {
            const data = await this.productRepository.find({ relations: ['categories'] })
            return {
                data,
                error: null,
                status: 200
            }
        } catch (error) {
            return {
                data: null,
                error: 'Cannot get any categories !',
                status: 404
            }
        }
    }
}