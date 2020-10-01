import { Request, Response } from "express";
import { EventBusiness } from "../business/EventBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { GalleryDatabase } from "../data/GalleryDatabase";
import { TicketDatabase } from "../data/TicketDatabase";
import { PhotoInputDTO } from "../model/Photo";
import { TicketInputDTO, UserTicketInputDTO } from "../model/Ticket";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class EventController {
    
    private static eventBusiness = new EventBusiness(
        new GalleryDatabase,
        new TicketDatabase,
        new IdGenerator,
        new Authenticator
    );

    async createTicket(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const input: TicketInputDTO = {
                event_id: req.body.event_id,
                ticket_name: req.body.ticket_name,
                ticket_price: req.body.ticket_price,
                ticket_quantity: req.body.ticket_quantity,
            }

            await EventController.eventBusiness.createTicket(token, input);

            res.status(200).send({ message: "Ticket successfully created" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async buyTicket(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const input: UserTicketInputDTO = {
                ticket_name: req.body.ticket_name,
                ticket_quantity: Number(req.body.ticket_quantity)
            }

            await EventController.eventBusiness.buyTicket(token, input);

            res.status(200).send({ message: "Ticket bought successfully" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async addPhoto(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const input: PhotoInputDTO = {
                day: req.body.day,
                photo: req.body.photo
            }

            await EventController.eventBusiness.addPhoto(token, input);

            res.status(200).send({ message: "Photo successfully added to event" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getEvent(req: Request, res: Response) {
        try {
            const day:string = req.params.day

            const result = await EventController.eventBusiness.getEventByDay(day);

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }
}