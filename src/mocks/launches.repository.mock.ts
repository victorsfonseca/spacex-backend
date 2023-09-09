import { ILaunchRepository } from "../contract/repository/iLaunch.repository";
import { Launch } from "../model/launch.model";
import { LaunchStats } from "../model/launchStats.model";
import { LaunchSuccessStats } from "../model/launchSuccessStats.model";
import { PaginatedReturn } from "../model/paginatedReturn.model";

export class LaunchRepositoryMock implements ILaunchRepository {
    launchesIdSaved(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    async getAll(search?: string | undefined, limit?: number | undefined, page?: number | undefined): Promise<PaginatedReturn<Launch>> {
        const docs = [
            {
                id: "5eb87cd9ffd86e000604b32a",
                flightNumber: 1,
                name: "FalconSat",
                launchDate: "2006-03-24T22:30:00.000Z",
                rocket: {
                  id: "5e9d0d95eda69955f709d1eb",
                  name: "Falcon 1"
                },
                success: false,
                youtubeCode: "0a_00nJ_Y88"
            },
            {
              id: "5eb87cdaffd86e000604b32b",
              flightNumber: 2,
              name: "DemoSat",
              launchDate: "2007-03-21T01:10:00.000Z",
              rocket: {
                id: "5e9d0d95eda69955f709d1eb",
                name: "Falcon 1"
              },
              success: false,
              youtubeCode: "Lk4zQ2wP-Nc"
            }
        ]
        const _totalDocs = docs.length
        const _page = page ?? 1
        const _totalPages = Math.ceil(_totalDocs / (limit ?? 10))
        
        return {
            results: [],
            totalDocs: _totalDocs,
            page: _page,
            totalPages: _totalPages,
            hasNext: _page < _totalPages,
            hasPrev: _page > 1
        }
    }
    getStats(): Promise<LaunchStats[]> {
        throw new Error("Method not implemented.");
    }
    async getSuccessStats(): Promise<LaunchSuccessStats> {
        return {
            success: 5,
            fails: 3
        }
    }
    createMany(launches: Launch[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

}