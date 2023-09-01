import { LaunchStats } from './../model/launchStats.model';
import { ILaunchRepository } from './../contract/repository/iLaunch.repository';
import { ILaunchBusiness } from "../contract/business/iLaunch.business.js";
import { Launch } from "../model/launch.model.js";
import { injectable, inject } from 'tsyringe'
import { PaginatedReturn } from '../model/paginatedReturn.model';
import { LaunchStatsReturn } from '../model/launchStatsReturn.model';
import { LaunchStatsPerRocket } from '../model/launchStatsPerRocket.model';
import { LaunchStatsPerYear, RocketLaunchesPerYear } from '../model/launchStatsPerYear.model';

@injectable()
export class LaunchBusiness implements ILaunchBusiness {
    private launchRepository: ILaunchRepository
    constructor(
        @inject('LaunchRepository')
        launchRepository: ILaunchRepository
        ){
        this.launchRepository = launchRepository
    }

    async getAll(search?: string, limit?: number, page?: number | undefined): Promise<PaginatedReturn<Launch>>{
        return this.launchRepository.getAll(search, limit, page)
    }


    async getStats(): Promise<LaunchStatsReturn> {
        return new Promise<LaunchStatsReturn>(async (resolve, reject) =>{
            try {
                let successStats = await this.launchRepository.getSuccessStats()
                let stats = await this.launchRepository.getStats()
                let rockets = [...new Set(stats.map(_ => _.rocketName))]
                let years = [...new Set(stats.map(_ => _.year))]
                
                let statsPerYear: LaunchStatsPerYear = {
                    years: years,
                    rockets: rockets.map(rocket => <RocketLaunchesPerYear>{
                        rocketName: rocket,
                        launches: years.map(year => stats.find(stat => stat.rocketName == rocket && stat.year == year)?.launches ?? 0)
                    })
                }
                
                let statsPerRocket: LaunchStatsPerRocket[] = []

                stats.forEach(_ => {
                    let rocket = statsPerRocket.find(rocket => rocket.rocket == _.rocketName)
                    if(rocket){
                        rocket.value = rocket.value + _.launches
                    }else{
                        statsPerRocket.push({rocket: _.rocketName, value: _.launches})
                    }
                })

                resolve(<LaunchStatsReturn>{
                    successResult: successStats,
                    statsPerYear: statsPerYear,
                    statsPerRocket: statsPerRocket
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}