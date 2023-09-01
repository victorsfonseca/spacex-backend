export interface IMainBusiness {
    getWelcomeMessage(): Promise<{message: string}>
}