import { Request, Response } from "express";
import { EventBusiness } from "../business/EventBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { EventDatabase } from "../data/EventDatabase";
import { PhotoInputDTO } from "../model/Photo";
import { TicketInputDTO, UserTicketInputDTO } from "../model/Ticket";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class EventController {
    
    private static eventBusiness = new EventBusiness(
        new EventDatabase,
        new IdGenerator,
        new Authenticator
    );

    async createTicket(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const input: TicketInputDTO = {
                event_id: req.body.event_id,
                ticket_name: req.body.ticket_name,
                ticket_price: Number(req.body.ticket_price),
                ticket_quantity: Number(req.body.ticket_quantity),
            }

            await EventController.eventBusiness.createTicket(token, input);

            res.status(200).send({ message: "Ticket successfully created" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getAllTickets(req: Request, res: Response) {
        try {
            const result = await EventController.eventBusiness.getAllTickets();

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async buyTicket(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const input: UserTicketInputDTO = {
                ticket_id: req.body.ticket_id,
                ticket_quantity: Number(req.body.ticket_quantity)
            }

            await EventController.eventBusiness.buyTicket(token, input);

            res.status(200).send({ message: "Ticket bought successfully" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getTicketByUser(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;

            const result = await EventController.eventBusiness.getTicketsByUser(token);

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async addPhoto(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const input: PhotoInputDTO = {
                event_id: req.body.event_id,
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
            const eventId:string = req.params.eventId

            const result = await EventController.eventBusiness.getEvent(eventId);

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getAllEvents(req: Request, res: Response) {
        try {
            const result = await EventController.eventBusiness.getAllEvents();

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }
}