import { IMainBusiness } from "../contract/business/iMain.business";

export class MainBusiness implements IMainBusiness{

    async getWelcomeMessage(): Promise<{ message: string; }> {
        return { message: "Fullstack Challenge 🏅 - Space X API"}
    }

}