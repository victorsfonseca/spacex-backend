import { LaunchStatsPerRocket } from "./launchStatsPerRocket.model";
import { LaunchStatsPerYear } from "./launchStatsPerYear.model";
import { LaunchSuccessStats } from "./launchSuccessStats.model";

export type LaunchStatsReturn = {
    successResult: LaunchSuccessStats,
    statsPerYear: LaunchStatsPerYear,
    statsPerRocket: LaunchStatsPerRocket[]
}