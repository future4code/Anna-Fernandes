import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandDatabase } from "../data/BandDatabase";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandController {
    
    private static bandBusiness = new BandBusiness(
        new BandDatabase,
        new IdGenerator,
        new Authenticator
    );

    async registerBand(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const input: BandInputDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible
            }

            await BandController.bandBusiness.registerBand(token, input);

            res.status(200).send({ message: "Band successfully register" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getBandById(req: Request, res: Response) {

        try {
            const bandId = req.params.bandId

            const result = await BandController.bandBusiness.getBandById(bandId)

            res.status(200).send({ result });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getBandByQuery(req: Request, res: Response) {

        try {
            const query = req.query.name as string

            const result = await BandController.bandBusiness.getBandByQuery(query)

            res.status(200).send({ result });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }
}