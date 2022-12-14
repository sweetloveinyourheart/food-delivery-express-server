import * as dotenv from 'dotenv'
dotenv.config()

import * as express from "express"
import * as bodyParser from "body-parser"
import { AppDataSource } from "./data-source"
import routers from "./routes"


AppDataSource.initialize().then(async () => {
    // create express app
    const app = express()    
    app.use(bodyParser.json())
    app.use('/', routers)
    // start express server
    app.listen(3000)

    console.log("Express server has started on port 3000")

}).catch(error => console.log(error))
