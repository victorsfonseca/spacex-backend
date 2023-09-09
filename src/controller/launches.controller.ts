import "reflect-metadata";
import { Router } from 'express'
import { inject, injectable } from 'tsyringe'
import { ILaunchBusiness } from '../contract/business/iLaunch.business.js'
import { IController } from '../contract/controller/iController.controller.js'

@injectable()
export class LaunchController implements IController{
    public router: Router
    private launchBusiness: ILaunchBusiness
    constructor(
        @inject('LaunchBusiness')
        launchBusiness: ILaunchBusiness
    ){
        this.router = Router()
        this.launchBusiness = launchBusiness
        this.configRoutes()
    }

    private configRoutes(){
        this.router.get('/', async (req, res) => {

            const search = req.query.search as string | undefined
            const limit = Number(req.query.limit) || undefined
            const page = Number(req.query.page) || undefined

            this.launchBusiness.getAll(search, limit, page)
            .then(_ => {
                res.json(_)
            })
            .catch(error => {
                res.status(400).json({message: error.message})
            })
        
        })
        
        this.router.get('/stats', (req, res) => {
            this.launchBusiness.getStats()
            .then(result =>{
                res.json(result)
            })
            .catch(error =>{
                res.status(400).json({message: error.message})
            })
        })
    }
}