import { Launch } from "../../model/launch.model.js";
import { LaunchStatsReturn } from "../../model/launchStatsReturn.model.js";
import { PaginatedReturn } from "../../model/paginatedReturn.model.js";

export interface ILaunchBusiness {
    getAll(search?: string, limit?: number, page?: number): Promise<PaginatedReturn<Launch>>
    getStats(): Promise<LaunchStatsReturn>
}