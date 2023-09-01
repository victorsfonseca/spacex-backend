import { container } from 'tsyringe'
import { ILaunchBatch } from '../contract/batch/iLaunch.batch.js';
import { LaunchBatch } from '../batch/launch.batch.js';
import { ILaunchBusiness } from '../contract/business/iLaunch.business.js';
import { LaunchBusiness } from '../business/launch.business.js';
import { ILaunchRepository } from '../contract/repository/iLaunch.repository.js';
import { LaunchRepository } from '../repository/launch.repository.js';
import { IHTTPClient } from '../contract/services/iHTTPCliente.service.js';
import { HTTPClient } from '../service/HTTPClient.service.js';
import { IDatabaseConfig } from '../contract/config/iDatabase.config.js';
import { Config } from './config.js';
import { ISpaceXConfig } from '../contract/config/iSpacex.config.js';
import { IMainBusiness } from '../contract/business/iMain.business.js';
import { MainBusiness } from '../business/main.business.js';

container.registerSingleton<IDatabaseConfig>('DatabaseConfig', Config)
container.registerSingleton<ISpaceXConfig>('SpaceXConfig', Config)
container.registerSingleton<ILaunchBatch>('LaunchBatch', LaunchBatch)
container.registerSingleton<ILaunchBusiness>('LaunchBusiness', LaunchBusiness)
container.registerSingleton<ILaunchRepository>('LaunchRepository', LaunchRepository)
container.registerSingleton<IHTTPClient>('HTTPClient', HTTPClient)
container.registerSingleton<IMainBusiness>('MainBusiness', MainBusiness)