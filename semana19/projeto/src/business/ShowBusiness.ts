import { ShowDatabase } from "../data/ShowDatabase";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { ShowInputDTO } from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {

    constructor(
        private showDatabase: ShowDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) {

    }

    async addShow(token: string, show: ShowInputDTO) {

        if ( !show.day || !show.start_time || !show.end_time || !show.band_id ) {
            throw new InvalidParameterError("Missing input");
        }

        if (show.start_time <= 8 || show.end_time >= 23) {
            throw new InvalidParameterError("This date is not avaible. The show have to be schedule between 8am and 11pm.");
        }

        const checkIfNotAvaible = await this.showDatabase.checkIfIsAvaiable(show.day, show.start_time);

        if (checkIfNotAvaible && checkIfNotAvaible.length !== 0) {
            throw new InvalidParameterError("This date is not avaible");
        }

        const id = this.idGenerator.generate();
        
        const accessToken = this.authenticator.getData(token).role;

        if (accessToken !== "ADMIN" ) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        await this.showDatabase.createShow(id, show.day, show.start_time, show.end_time, show.band_id);

    }

    async getShowById(showId: string) {

        const showFromDB = await this.showDatabase.getShowById(showId);

        return showFromDB;
    }

    async getShowByDay(day: string) {

        const showFromDB = await this.showDatabase.getShowByDay(day);

        return showFromDB;
    }
    
}