import { Ticket } from "../model/Ticket";
import { BaseDatabase } from "./BaseDatabase";

export class TicketDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_tickets";
  private static TABLE_TICKETS_BUYERS = "lama_tickets_buyers";

  public async createTicket(
      id: string,
      ticket_name: string,
      ticket_price: number,
      event_id: string,
      ticket_quantity: number,
      ticket_sold: number = 0,
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          ticket_name,
          ticket_price,
          event_id,
          ticket_quantity,
          ticket_sold
        })
        .into(TicketDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getTicketById(id: string): Promise<Ticket> {
    const result = await this.getConnection()
      .select("*")
      .from(TicketDatabase.TABLE_NAME)
      .where({ id });

    return Ticket.toTicketsModel(result[0]);
  }

  public async getShowByDay(event_id: string): Promise<Ticket> {
    const result = await this.getConnection()
      .select("*")
      .from(TicketDatabase.TABLE_NAME)
      .where({ event_id });

    return Ticket.toTicketsModel(result[0]);
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
      .into(TicketDatabase.TABLE_TICKETS_BUYERS);
  } catch (error) {
      throw new Error(error.sqlMessage || error.message);
  }
}

}
