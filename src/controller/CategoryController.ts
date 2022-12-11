import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Category } from '../entity/Category'
import { Res } from '..'

export class CategoryController {
    private categoryRepository = AppDataSource.getRepository(Category)

    async newCategory(req: Request, res: Response, next: NextFunction): Promise<Res> {
        try {
            const { name, image } = req.body;

            const category = Object.assign(new Category(), {
                name,
                image
            })
            const newCategory = await this.categoryRepository.save(category)

            return {
                data: newCategory,
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

    async getCategory(req: Request, res: Response, next: NextFunction): Promise<Res> {
        try {
            const data = await this.categoryRepository.find()
            return {
                data,
                error: null,
                status: 200
            }
        } catch (error) {
            return {
                data: null,
                error: 'Cannot get any categories !',
                status: 200
            }
        }
    }
}