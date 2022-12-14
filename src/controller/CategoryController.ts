import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Category } from '../entity/Category'

export class CategoryController {
    constructor(
        private categoryRepository = AppDataSource.getRepository(Category)
    ) { 
        this.getCategory = this.getCategory.bind(this)
        this.newCategory = this.newCategory.bind(this)
    }

    async newCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, image } = req.body;

            const category = Object.assign(new Category(), {
                name,
                image
            })
            const newCategory = await this.categoryRepository.save(category)

            return res.status(201).json({
                data: newCategory,
                error: null
            })
        } catch (error) {
            return res.status(400).json({
                data: null,
                error: 'Create new category failed'
            })
        }
    }

    async getCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.categoryRepository.find()
            return res.status(200).json({
                data,
                error: null
            })
        } catch (error) {
            return res.status(404).json({
                data: null,
                error: 'Cannot get categories list'
            })
        }
    }
}