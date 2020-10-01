import { BandDatabase } from "../data/BandDatabase";

export class BandBusiness {

    constructor(
        private bandDatabase = new BandDatabase()
    ) {

    }

    async getBandById(bandId: string) {

        const bandFromDB = await this.bandDatabase.getBandById(bandId);

        return bandFromDB;
    }
    
}