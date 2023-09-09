import express from 'express'
import { Express } from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { Route } from './model/route.server.js'
const swaggerDocument = require('../swagger.json')

export class Server{
    public app: Express
    private routes: Route[]
    private server: any
    constructor(routes: Route[]){
        this.routes = routes
        this.app = express()
    }
    run(){
        const port = 5000

        this.app.use(express.json())
        this.app.use(cors())

        this.routes.forEach( _ => {
            this.app.use(_.path, _.router)
        })

        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

        this.server = this.app.listen(port, () => console.log(`server running on port ${port}`))
    }

    stop(){
        this.server.close()
    }
}