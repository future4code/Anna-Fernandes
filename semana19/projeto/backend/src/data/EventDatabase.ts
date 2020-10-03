import moment from 'moment';

import { Photo } from "../model/Photo";
import { Ticket } from "../model/Ticket";
import { BandDatabase } from "./BandDatabase";
import { BaseDatabase } from "./BaseDatabase";
import { ShowDatabase } from "./ShowDatabase";

export class EventDatabase extends BaseDatabase {

  private static TABLE_EVENTS = "lama_events";
  private static TABLE_GALLERY = "lama_events_photos";
  private static TABLE_TICKETS = "lama_tickets";
  private static TABLE_TICKETS_BUYERS = "lama_tickets_buyers";
  private static TABLE_USERS = "lama_users";

  public async createTicket(
    id: string,
    event_id: string,
    ticket_name: string,
    ticket_price: number,
    ticket_quantity: number,
    ticket_sold: number = 0,
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          event_id,
          ticket_name,
          ticket_price,
          ticket_quantity,
          ticket_sold
        })
        .into(EventDatabase.TABLE_TICKETS);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getTicketById(id: string): Promise<Ticket> {
    const result = await this.getConnection()
      .select("*")
      .from(EventDatabase.TABLE_TICKETS)
      .where({ id })

    return Ticket.toTicketsModel(result[0]);
  }

  public async getAllTickets(): Promise<Ticket[]> {
    const result = await this.getConnection()
      .select("*")
      .from(EventDatabase.TABLE_TICKETS)
      .join(EventDatabase.TABLE_EVENTS, `${EventDatabase.TABLE_TICKETS}.event_id`, `${EventDatabase.TABLE_EVENTS}.id`)
      .orderBy(`${EventDatabase.TABLE_TICKETS}.event_id`, 'asc')

    return result;
  }

  public async buyTicket(
      id: string,
      ticket_id: string,
      ticket_quantity: number,
      user_id: string
      ): Promise<void> {
    try {
      await this.getConnection()
      .insert({
        id,
        ticket_id,
        ticket_quantity,
        user_id
      })
      .into(EventDatabase.TABLE_TICKETS_BUYERS);

      await this.calculateTicketsSold(ticket_id)
    } catch (error) {
        throw new Error(error.sqlMessage || error.message);
    }
  }

  public async calculateTicketsSold(ticketsId: string) {
    const sum_sold_tickets = await this.getConnection().raw(`
      SELECT SUM(ticket_quantity) AS total_sold
      FROM ${EventDatabase.TABLE_TICKETS_BUYERS} as tickets
      WHERE tickets.ticket_id = "${ticketsId}"
    `)

    await this.getConnection().raw(`
        UPDATE ${EventDatabase.TABLE_TICKETS} as tickets
        SET tickets.ticket_sold = ${sum_sold_tickets[0][0].total_sold} 
        WHERE tickets.id = "${ticketsId}"
    `)

  }

  public async getTicketsByUser(userId: string) {
    
    const result = await this.getConnection().raw(`
      SELECT *
      FROM ${EventDatabase.TABLE_TICKETS_BUYERS} as tickets
      JOIN ${EventDatabase.TABLE_USERS} as users
      ON tickets.user_id = users.id
      JOIN ${EventDatabase.TABLE_TICKETS} as alltickets
      ON tickets.ticket_id = alltickets.id
      JOIN ${EventDatabase.TABLE_EVENTS} as events
      ON alltickets.event_id = events.id
      WHERE tickets.user_id = "${userId}"
    `)

    return result;
  }

  public async addPhoto(
      id: string,
      event_id: string,
      photo: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          event_id,
          photo
        })
        .into(EventDatabase.TABLE_GALLERY);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getPhotos(eventId: string): Promise<any> {
  
    const result = await this.getConnection().raw(`
        SELECT *
        FROM ${EventDatabase.TABLE_GALLERY}
        WHERE event_id = "${eventId}"
    `);

    const gallery: any[] = [];
    
    for(let photo of result[0]){
      gallery.push({
          id: photo.id,
          photo: photo.photo
      });
    }  
    
    return gallery;  
  }

  public async getEvent(eventId: string): Promise<any> {
    const result = await this.getConnection().raw(`
        SELECT *
        FROM ${EventDatabase.TABLE_EVENTS} as event
        WHERE event.id = "${eventId}"
    `)
    const events: any[] =[];
    for(let event of result[0]) {
      const gallery = await this.getPhotos(eventId);
      const showsDatabase = new ShowDatabase();
      const shows = await showsDatabase.getShowByDay(event.day)

      events.push({
        id: event.id,
        day: event.day,
        data: new Date(event.data).toLocaleString('pt-BR'),
        description: event.description,
        shows: shows,
        gallery: gallery
      })

    }

    return events;
  }

  public async getAllEvents(): Promise<any[]> {
    const result = await this.getConnection().raw(`
        SELECT *
        FROM ${EventDatabase.TABLE_EVENTS} as event
    `)
    const events: any[] =[];
    for(let event of result[0]) {
      const gallery = await this.getPhotos(event.id);
      const showsDatabase = new ShowDatabase();
      const shows = await showsDatabase.getShowByDay(event.day)

      events.push({
        id: event.id,
        day: event.day,
        data: moment(event.data, "YYYY-MM-DD").format("DD/MM/YYYY"),
        description: event.description,
        shows: shows,
        gallery: gallery
      })

    }

    return events;
  }

}
