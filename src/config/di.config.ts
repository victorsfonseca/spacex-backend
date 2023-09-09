import { container } from 'tsyringe'
import { ILaunchBatch } from '../contract/batch/iLaunch.batch';
import { LaunchBatch } from '../batch/launch.batch';
import { ILaunchBusiness } from '../contract/business/iLaunch.business';
import { LaunchBusiness } from '../business/launch.business';
import { ILaunchRepository } from '../contract/repository/iLaunch.repository';
import { LaunchRepository } from '../repository/launch.repository';
import { IHTTPClient } from '../contract/services/iHTTPCliente.service';
import { HTTPClient } from '../service/HTTPClient.service';
import { IDatabaseConfig } from '../contract/config/iDatabase.config';
import { Config } from './config';
import { ISpaceXConfig } from '../contract/config/iSpacex.config';
import { IMainBusiness } from '../contract/business/iMain.business';
import { MainBusiness } from '../business/main.business';
import { iDi } from '../contract/config/iDi.config';

export class DependencyInjection implements iDi{
    resgiter(): void {
        container.registerSingleton<IDatabaseConfig>('DatabaseConfig', Config)
        container.registerSingleton<ISpaceXConfig>('SpaceXConfig', Config)
        container.registerSingleton<ILaunchBatch>('LaunchBatch', LaunchBatch)
        container.registerSingleton<ILaunchBusiness>('LaunchBusiness', LaunchBusiness)
        container.registerSingleton<ILaunchRepository>('LaunchRepository', LaunchRepository)
        container.registerSingleton<IHTTPClient>('HTTPClient', HTTPClient)
        container.registerSingleton<IMainBusiness>('MainBusiness', MainBusiness)
    }
    
}

