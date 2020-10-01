import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { ShowDatabase } from "../data/ShowDatabase";

export class ShowController {
    
    private static showBusiness = new ShowBusiness(
        new ShowDatabase,
    );

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
}