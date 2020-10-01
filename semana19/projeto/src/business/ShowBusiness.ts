import { ShowDatabase } from "../data/ShowDatabase";

export class ShowBusiness {

    constructor(
        private showDatabase = new ShowDatabase()
    ) {

    }

    async getShowById(showId: string) {

        const showFromDB = await this.showDatabase.getShowById(showId);

        return showFromDB;
    }
    
}