import { ILogger } from "../contract/services/iLogger.service";

export class Logger implements ILogger{
    log(message: string): void {
        console.log(message)
    }
}