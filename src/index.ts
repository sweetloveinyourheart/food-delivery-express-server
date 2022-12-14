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
    const PORT = process.env.PORT
    app.listen(PORT)

    console.log(`Express server has started on port ${PORT}`)

}).catch(error => console.log(error))
