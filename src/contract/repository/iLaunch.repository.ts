import { LaunchSuccessStats } from './../../model/launchSuccessStats.model';
import { Launch } from "../../model/launch.model";
import { LaunchStats } from "../../model/launchStats.model";
import { PaginatedReturn } from "../../model/paginatedReturn.model";

export interface ILaunchRepository {
    launchesIdSaved(): Promise<string[]>
    getAll(search?: string , limit?: number, page?:number): Promise<PaginatedReturn<Launch>>
    getStats(): Promise<LaunchStats[]>
    getSuccessStats(): Promise<LaunchSuccessStats>
    createMany(launches: Launch[]): Promise<void>
}