import { Photo } from "../model/Photo";
import { BaseDatabase } from "./BaseDatabase";

export class GalleryDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_events_photos";
  private static TABLE_TICKETS = "lama_tickets";

  public async addPhoto(
      id: string,
      day: string,
      photo: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          day,
          photo
        })
        .into(GalleryDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async checkIfIsAvaiable(day: string): Promise<Event> {
    const result = await this.getConnection()
      .select("*")
      .from(GalleryDatabase.TABLE_NAME)
      .where({ day })

    return result[0];
  }

  public async getEventByDay(day: string): Promise<Event> {
    const result = await this.getConnection().raw(`
        SELECT event.day, event.photo, tickets.ticket_name, tickets.ticket_price, tickets.tickets_sold
        FROM ${GalleryDatabase.TABLE_NAME} as event
        GROUP BY event.day
        WHERE event.day = ${day}
        JOIN ${GalleryDatabase.TABLE_TICKETS} as tickets
        ON event.id = tickets.event_id
    `)

    return result[0];
  }

}
