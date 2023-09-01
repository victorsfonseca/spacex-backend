import { Rocket } from './rocket.model'

export type Launch = {
    id: string
    flightNumber: number,
    name: string,
    launchDate: Date,
    rocket: Rocket,
    success: boolean,
    youtubeCode: string
}