import { Launch } from './../model/launch.model';
import { injectable, inject } from 'tsyringe';
import { ILaunchRepository } from "../contract/repository/iLaunch.repository";
import { IHTTPClient } from "../contract/services/iHTTPCliente.service";
import { LaunchSpacexApi } from "../model/launch_spacex_api.model";
import { ILaunchBatch } from '../contract/batch/iLaunch.batch';
import { Rocket } from '../model/rocket.model';
import { ISpaceXConfig } from '../contract/config/iSpacex.config';

@injectable()
export class LaunchBatch implements ILaunchBatch {
    private launchRepository: ILaunchRepository;
    private httpClient: IHTTPClient
    private spacexConfig: ISpaceXConfig
    constructor(
        @inject('LaunchRepository')
        launchRepository: ILaunchRepository,
        @inject('HTTPClient')
        httpClient: IHTTPClient,
        @inject('SpaceXConfig')
        spacexConfig: ISpaceXConfig
        ){
        this.launchRepository = launchRepository
        this.httpClient = httpClient
        this.spacexConfig = spacexConfig
    }
    async saveNewLaunches(){
        return new Promise<void>(async (resolve, reject) =>{
            try {
                let allRockets = await this.GetAllRocketsFromAPI()
                let allLaunches = await this.GetAllLaunchesFromAPI()
                let idsAlreadySaved = await this.GetSavedLaunchesIds()
                let launchesNotSaved = allLaunches.filter(launch => !idsAlreadySaved.includes(launch.id))
                if(launchesNotSaved.length <= 0){
                    console.log(`${launchesNotSaved.length} novos lançamentos salvos.`)
                    resolve()
                }
                let launchesToSave = launchesNotSaved.map(launch => {
                    let launchDate = new Date(launch.date_utc)
                    return <Launch>{
                        id: launch.id,
                        flightNumber: launch.flight_number,
                        name: launch.name,
                        launchDate: launchDate,
                        rocket: allRockets.find(_ => _.id == launch.rocket) || <Rocket>{ id: launch.rocket },
                        success: launch.success,
                        youtubeCode: launch.links.youtube_id,
                        patch: launch.links.patch.small
                    }
                })
                await this.launchRepository.createMany(launchesToSave)
                console.log(`${launchesToSave.length} novos lançamentos salvos.`)
                resolve()
            } catch (error: any) {
                reject(error)
            }
        })
    }

    private async GetAllLaunchesFromAPI(): Promise<LaunchSpacexApi[]> {
        return new Promise((resolve,reject) => { 
            this.httpClient.get<LaunchSpacexApi[]>(this.spacexConfig.launchApiURL).then( response => {
                if(response.status != 200) reject( new Error(`Erro ao buscar novos lançamentos da api: ${this.spacexConfig.launchApiURL}`) )
                resolve(response.data)
            })
        })
    }

    private async GetSavedLaunchesIds(): Promise<string[]> {
        return this.launchRepository.launchesIdSaved()
    }

    private async GetAllRocketsFromAPI(): Promise<Rocket[]> {
        return new Promise((resolve, reject) =>{
            this.httpClient.get<any[]>(this.spacexConfig.rocketApiURL).then(response => {
                if(response.status != 200) reject(new Error(`Erro ao buscar foguetes da api: ${this.spacexConfig.rocketApiURL}`) )
                let rockets = response.data.map(_ => <Rocket>{id: _.id, name: _.name})
                resolve(rockets)
            })
            .catch(error =>{
                reject(error)
            })
        })
    }
}
