import "reflect-metadata";
import "./config/di.config.js"
import express from 'express'
import cors from 'cors'
import {router as mainRounter} from './controller/main.controller.js'
import {router as launchRouter} from './controller/launches.controller.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/', mainRounter)

app.use('/launches', launchRouter)

app.listen(5000, () => console.log('server running on port 5000'))

export default app