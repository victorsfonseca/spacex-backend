import { inject, injectable } from 'tsyringe';
import { Launch } from '../model/launch.model';
import { LaunchStats } from '../model/launchStats.model';
import { PaginatedReturn } from '../model/paginatedReturn.model';
import { ILaunchRepository } from '../contract/repository/iLaunch.repository.js';
import mongodb, { MongoClient } from 'mongodb'
import { IDatabaseConfig } from '../contract/config/iDatabase.config';
import { Rocket } from '../model/rocket.model';
import { LaunchSuccessStats } from '../model/launchSuccessStats.model';

@injectable()
export class LaunchRepository implements ILaunchRepository {
    private config: IDatabaseConfig
    constructor(
        @inject('SpaceXConfig')
        config: IDatabaseConfig
    ){
        this.config = config
    }

    private connectDB(): Promise<MongoClient>{
        const dbClient = mongodb.MongoClient
        return dbClient.connect(this.config.connectionString)
    }

    async launchesIdSaved(): Promise<string[]> {
        return new Promise(async(resolve, reject)=>{
            let client: MongoClient | null = null
            try{
                client = await this.connectDB()
                let db = client.db(this.config.databaseName)
                let result= (await db.collection('launches').find({}).toArray())
                return resolve(result.map(_ => _.id) || [])
            }
            catch(error: any){
                reject(error)
            }
            finally{
                if(client) client.close()
            }
        })
    }
    
    async getAll(search?: string, limit?: number, page?: number | undefined): Promise<PaginatedReturn<Launch>> {
        let client: MongoClient | null = null
        try{
            client = await this.connectDB()
            let db = client.db(this.config.databaseName)
            const collection = db.collection('launches');

            const query: any = {};
            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { success: search.toLowerCase() === 'sucesso' }
                ];
            }

            const totalCount = await collection.countDocuments(query);

            limit = limit || 10;    // Valor padrão para limit se não for fornecido
            page = page || 1;       // Valor padrão para page se não for fornecido

            const options = {
            limit,
            skip: (page - 1) * limit
            };

            const launches = await collection.find(query, options).toArray();
            const launchesResult = launches.map(_ => <Launch>{
                id: _.id,
                flightNumber: _.flightNumber,
                name: _.name,
                launchDate: new Date(_.launchDate.toString()),
                rocket: <Rocket>{
                    id: _.rocket.id,
                    name: _.rocket.name
                },
                success: _.success,
                youtubeCode: _.youtubeCode
            })

            const totalPages = Math.ceil(totalCount / limit);

            const paginatedResult = {
            results: launchesResult,
            totalDocs: totalCount,
            page,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
            };

            return paginatedResult;
        }
        catch(error){
            throw error
        }
        finally{
            if(client) client.close()
        }
    }

    async getStats(): Promise<LaunchStats[]> {
        const client = await this.connectDB()
        try {
          await client.connect();
          const db = client.db(this.config.databaseName);
          const collection = db.collection('launches');

          const pipeline = [
            {
                $group: {
                    _id: {
                        year: { $year: '$launchDate' },
                        rocket: '$rocket.name'
                    },
                    launches: { $sum: 1 },
                }
              },
              {
                $sort: { _id: 1 }
              }
          ];
      
          const result = await collection.aggregate(pipeline).toArray()
          return result.map(_ => <LaunchStats>{
            year: _._id.year,
            rocketName: _._id.rocket,
            launches: _.launches
          });

        } finally {
          client.close();
        }
    }

    async getSuccessStats(): Promise<LaunchSuccessStats> {
        const client = await this.connectDB()
        try {
          await client.connect();
          const db = client.db(this.config.databaseName);
          const collection = db.collection('launches');
          const result = await collection.aggregate([{
            $group: {
                _id: '$success' ,
                count: { $sum: 1 },
              }
          }]).toArray()
          let success = result.find(_ => _._id)?.count ?? 0
          let fails = result.find(_ => _._id == false)?.count ?? 0
          let failsNull = result.find(_ => _._id == null)?.count ?? 0
          return <LaunchSuccessStats>{
            success: success,
            fails: fails + failsNull
          }
        } finally {
            client.close();
        }
    }

    async createMany(launches: Launch[]): Promise<void> {
        return new Promise(async(resolve, reject)=>{
            let client: MongoClient | null = null
            try{
                client = await this.connectDB()
                let db = client.db(this.config.databaseName)
                await db.collection('launches').insertMany(launches)
                return resolve()
            }
            catch(error: any){
                reject(error)
            }
            finally{
                if(client) client.close()
            }
        })
    }
}