import "reflect-metadata";
import {DependencyInjection} from "./config/di.config"
import { container } from 'tsyringe';
import { ILaunchBatch } from "./contract/batch/iLaunch.batch.js";

const di = new DependencyInjection()
di.resgiter()

const launchBatch = container.resolve<ILaunchBatch>('LaunchBatch')

async function run(){
    launchBatch.saveNewLaunches()
    .then(() => {
        process.exit()
    })
    .catch(error => {
        console.log(error.message)
    })
}

run()