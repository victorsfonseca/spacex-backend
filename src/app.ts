import "reflect-metadata";
import {DependencyInjection} from "./config/di.config"
import { Server } from './server'
import { MainController } from './controller/main.controller'
import { LaunchController } from './controller/launches.controller'
import { container } from "tsyringe";

const di = new DependencyInjection()
di.resgiter()


let mainController = container.resolve(MainController)
let launchController = container.resolve(LaunchController)

const routes = [
    {path: '/', router: mainController.router},
    {path: '/launches', router: launchController.router}
]

const server = new Server(routes)

server.run()
