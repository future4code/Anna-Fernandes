import { GalleryDatabase } from "../data/GalleryDatabase";
import { TicketDatabase } from "../data/TicketDatabase";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { PhotoInputDTO } from "../model/Photo";
import { TicketInputDTO, UserTicketInputDTO } from "../model/Ticket";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class EventBusiness {

    constructor(
        private galleryDatabase: GalleryDatabase,
        private ticketDatabase: TicketDatabase,
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

        await this.ticketDatabase.createTicket(
            id,
            ticket.ticket_name,
            ticket.ticket_price,
            ticket.event_id,
            ticket.ticket_quantity
        );
    }

    async buyTicket(token: string, userTicket: UserTicketInputDTO) {

        if (!userTicket.ticket_name || !userTicket.ticket_quantity) {
            throw new InvalidParameterError("Missing input");
        }

        const id = this.idGenerator.generate();

        const accessTokenId = this.authenticator.getData(token).id;

        await this.ticketDatabase.buyTicket(
            id,
            userTicket.ticket_name,
            userTicket.ticket_quantity,
            accessTokenId
        );

    }

    async addPhoto(token: string, photo: PhotoInputDTO) {

        if (!photo.day || !photo.photo) {
            throw new InvalidParameterError("Missing input");
        }

        const id = this.idGenerator.generate();

        const accessTokenRole = this.authenticator.getData(token).role;

        if (accessTokenRole !== "ADMIN") {
            throw new UnauthorizedError("You don't have permission to do that");
        }

        await this.galleryDatabase.addPhoto(
            id,
            photo.day,
            photo.photo
        );
    }

    async getEventByDay(day: string) {

        if (!day) {
            throw new InvalidParameterError("Missing input");
        }

        const result = await this.galleryDatabase.getEventByDay(day);

        return result
    }

}