import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { ShowDatabase } from "../data/ShowDatabase";
import { ShowInputDTO } from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowController {
    
    private static showBusiness = new ShowBusiness(
        new ShowDatabase,
        new IdGenerator,
        new Authenticator
    );

    async addShow(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const input: ShowInputDTO = {
                day: req.body.day, 
                start_time: Number(req.body.start_time), 
                end_time: Number(req.body.end_time), 
                band_id: req.body.band_id
            }

            await ShowController.showBusiness.addShow(token, input);

            res.status(200).send({ message: "Band successfully register" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getShowById(req: Request, res: Response) {

        try {
            const showId = req.params.showId

            const result = await ShowController.showBusiness.getShowById(showId)

            res.status(200).send({ result });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getShowByDay(req: Request, res: Response) {

        try {
            const day = req.body.day

            const result = await ShowController.showBusiness.getShowByDay(day)

            res.status(200).send({ result });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }
}