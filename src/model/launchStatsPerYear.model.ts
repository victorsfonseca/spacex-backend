export type LaunchStatsPerYear = {
    years: number[],
    rockets: RocketLaunchesPerYear[]
}

export type RocketLaunchesPerYear = {
    rocketName: string,
    launches: number[]
}