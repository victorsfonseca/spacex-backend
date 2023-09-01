import { Router } from 'express'
import { container } from 'tsyringe'
import { ILaunchBusiness } from '../contract/business/iLaunch.business.js'

export const router = Router()
let launchBusiness: ILaunchBusiness = container.resolve('LaunchBusiness')

router.get('/', async (req, res) => {

    const search = req.query.search as string | undefined
    const limit = Number(req.query.limit) || undefined
    const page = Number(req.query.page) || undefined

    launchBusiness.getAll(search, limit, page)
    .then(_ => {
        res.json(_)
    })
    .catch(error => {
        res.status(400).json({message: error.message})
    })

})

router.get('/stats', (req, res) => {
    try{
        launchBusiness.getStats()
        .then(result =>{
            res.json(result)
        })
        .catch(error =>{
            res.status(400).json({message: error.message})
        })
        
    }
    catch(error : any){
        res.status(400).json({message: error.message})
    }
})

export default router