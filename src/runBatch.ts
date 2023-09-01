import "reflect-metadata";
import "./config/di.config.js"
import { container } from 'tsyringe';
import { ILaunchBatch } from "./contract/batch/iLaunch.batch.js";

const launchBatch = container.resolve<ILaunchBatch>('LaunchBatch')

async function run(){
    launchBatch.saveNewLaunches()
    .then(() => {
        console.log('acabou o run batch')
        process.exit()
    })
}

run()