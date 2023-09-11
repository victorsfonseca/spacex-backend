import { injectable } from 'tsyringe';
import { IDatabaseConfig } from "../contract/config/iDatabase.config";
import { ISpaceXConfig } from "../contract/config/iSpacex.config";
import dotenv from 'dotenv'

@injectable()
export class Config implements IDatabaseConfig, ISpaceXConfig{
    constructor(){
        dotenv.config()
        this.rocketApiURL = process.env.ROCKET_API_URL ?? 'https://api.spacexdata.com/v4/rockets';
        this.launchApiURL = process.env.LAUNCHES_API_URL ?? 'https://api.spacexdata.com/v5/launches';
        this.connectionString = process.env.DB_CONNECTION_STRING ?? 'mongodb://yourusername:yourpassword@mongo:27017/?authSource=admin&readPreference=primary&ssl=false&directConnection=true'
        this.databaseName = process.env.DATABASE_NAME ?? 'spacex'
    }
    public readonly rocketApiURL: string
    public readonly launchApiURL: string
    public readonly connectionString: string
    public readonly databaseName: string
}