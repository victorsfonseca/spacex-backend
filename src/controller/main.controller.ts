import { Router } from 'express'
import { IMainBusiness } from '../contract/business/iMain.business'
import { container } from 'tsyringe'

let mainBusiness: IMainBusiness = container.resolve('MainBusiness')
export const router = Router()

router.get('/', (req, res) => {
    mainBusiness.getWelcomeMessage()
    .then(message => {
        res.json(message)
    })
    .catch(error => {
        res.status(400).json({message: error.message})
    })
})

export default router