import { injectable } from 'tsyringe';
import { IDatabaseConfig } from "../contract/config/iDatabase.config";
import { ISpaceXConfig } from "../contract/config/iSpacex.config";

@injectable()
export class Config implements IDatabaseConfig, ISpaceXConfig{
    public rocketApiURL: string = 'https://api.spacexdata.com/v4/rockets';
    public launchApiURL: string = 'https://api.spacexdata.com/v5/launches';
    // public connectionString: string = 'mongodb://127.0.0.1:27017';
    public connectionString: string = 'mongodb+srv://victorsf:QRFCNWZhFv9CiBvL@coodesh.hwqgf1g.mongodb.net/?retryWrites=true&w=majority';
    public databaseName: string = 'spacex'
}