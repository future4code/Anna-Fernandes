import { BandDatabase } from "../data/BandDatabase";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { BandInputDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness {

    constructor(
        private bandDatabase: BandDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) {

    }

    async registerBand(token: string, band: BandInputDTO) {

        if (!band.name || !band.music_genre || !band.responsible ) {
            throw new InvalidParameterError("Missing input.");
        }

        const id = this.idGenerator.generate();
        
        const accessToken = this.authenticator.getData(token);

        if (accessToken.role !== "ADMIN" ) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        await this.bandDatabase.createBand(id, band.name, band.music_genre, band.responsible);

    }

    async getBandById(bandId: string) {

        if (!bandId ) {
            throw new InvalidParameterError("Missing input.");
        }

        const bandFromDB = await this.bandDatabase.getBandById(bandId);

        return bandFromDB;
    }

    async getBandByQuery(search: string) {

        if (!search ) {
            throw new InvalidParameterError("Missing input.");
        }

        const bandFromDB = await this.bandDatabase.getBandByQuery(search);

        return bandFromDB;
    }
    
}