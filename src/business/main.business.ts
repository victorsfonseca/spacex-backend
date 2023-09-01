import { IMainBusiness } from "../contract/business/iMain.business";

export class MainBusiness implements IMainBusiness{

    async getWelcomeMessage(): Promise<{ message: string; }> {
        return new Promise((resolve) =>{
            return resolve({
                        message: "Fullstack Challenge 🏅 - Space X API"
                    })
        })
    }

}