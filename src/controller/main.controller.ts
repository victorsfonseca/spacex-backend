import "reflect-metadata";
import { Router } from 'express'
import { IMainBusiness } from '../contract/business/iMain.business'
import { inject, injectable } from 'tsyringe'
import { IController } from '../contract/controller/iController.controller'

@injectable()
export class MainController implements IController{
    public router: Router
    private mainBusiness: IMainBusiness
    constructor(
        @inject('MainBusiness')
        mainBusiness: IMainBusiness
    ){
        this.router = Router()
        this.mainBusiness = mainBusiness
        this.configRoutes()
    }

    private configRoutes(){
        this.router.get('/', (req, res) => {
            this.mainBusiness.getWelcomeMessage()
            .then(message => {
                res.json(message)
            })
            .catch(error => {
                res.status(400).json({message: error.message})
            })
        })
    }
}