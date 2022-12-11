import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
 
export interface Res {
    data: any
    error: any
    status: number
}

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            const result: Res = await (new (route.controller as any))[route.action](req, res, next)
            
             res.status(result.status).json({
                data: result.data,
                error: result.error
            })
        })
    })

    // start express server
    app.listen(3000)

    console.log("Express server has started on port 3000")

}).catch(error => console.log(error))
