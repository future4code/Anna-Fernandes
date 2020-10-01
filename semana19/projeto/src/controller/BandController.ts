import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandDatabase } from "../data/BandDatabase";
import { BaseDatabase } from "../data/BaseDatabase";

export class BandController {
    
    private static bandBusiness = new BandBusiness(
        new BandDatabase,
    );

    async getShowById(req: Request, res: Response) {

        try {
            const bandId = req.params.bandId

            const result = await BandController.bandBusiness.getBandById(bandId)

            res.status(200).send({ result });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }
}