import { EventDatabase } from "../data/EventDatabase";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { PhotoInputDTO } from "../model/Photo";
import { TicketInputDTO, UserTicketInputDTO } from "../model/Ticket";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class EventBusiness {

    constructor(
        private eventDatabase: EventDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) {

    }

    async createTicket(token: string, ticket: TicketInputDTO) {

        if (!ticket.ticket_name || !ticket.ticket_price || !ticket.event_id || !ticket.ticket_quantity) {
            throw new InvalidParameterError("Missing input");
        }

        const id = this.idGenerator.generate();

        const accessTokenRole = this.authenticator.getData(token).role;

        if (accessTokenRole !== "ADMIN") {
            throw new UnauthorizedError("You don't have permission to do that");
        }

        await this.eventDatabase.createTicket(
            id,
            ticket.event_id,
            ticket.ticket_name,
            ticket.ticket_price,
            ticket.ticket_quantity
        );
    }

    async buyTicket(token: string, userTicket: UserTicketInputDTO) {

        if (!userTicket.ticket_id || !userTicket.ticket_quantity) {
            throw new InvalidParameterError("Missing input.");
        }
        
        const id = this.idGenerator.generate();
        
        const accessTokenId = this.authenticator.getData(token).id;
        
        if (!accessTokenId) {
            throw new UnauthorizedError("You need to be logged in to buy tickets.");
        }

        await this.eventDatabase.buyTicket(
            id,
            userTicket.ticket_id,
            userTicket.ticket_quantity,
            accessTokenId
        );

    }

    async getAllTickets() {

        const result = await this.eventDatabase.getAllTickets();

        return result
        
    }

    async getTicketsByUser(token: string) {

        const accessTokenId = this.authenticator.getData(token).id;

        if (!accessTokenId) {
            throw new InvalidParameterError("You don't haver permission to see that.");
        }

        const result = await this.eventDatabase.getTicketsByUser(accessTokenId);

        return result[0]

    }

    async addPhoto(token: string, photo: PhotoInputDTO) {

        if (!photo.event_id || !photo.photo) {
            throw new InvalidParameterError("Missing input");
        }

        const id = this.idGenerator.generate();

        const accessTokenRole = this.authenticator.getData(token).role;

        if (accessTokenRole !== "ADMIN") {
            throw new UnauthorizedError("You don't have permission to do that");
        }

        await this.eventDatabase.addPhoto(
            id,
            photo.event_id,
            photo.photo
        );
    }

    async getEvent(eventId: string) {

        if (!eventId) {
            throw new InvalidParameterError("Missing input");
        }

        const result = await this.eventDatabase.getEvent(eventId);

        return result
    }

    async getAllEvents() {

        const result = await this.eventDatabase.getAllEvents();

        return result

    }

}