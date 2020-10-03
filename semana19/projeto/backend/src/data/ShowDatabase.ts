import { Show, Day } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_shows";
  private static TABLE_SHOWS = "lama_bands";

  public async createShow(
      id: string,
      day: string,
      start_time: number,
      end_time: number,
      band_id: string,
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          day,
          start_time,
          end_time,
          band_id,
        })
        .into(ShowDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getShowById(id: string): Promise<Show> {
    const result = await this.getConnection().raw(`
      SELECT *
      FROM ${ShowDatabase.TABLE_NAME} as shows
      JOIN ${ShowDatabase.TABLE_SHOWS} as bands
      WHERE shows.id = "${id}"
    `)

    return result[0];
  }

  public async getShowByDay(day: string): Promise<Show> {
    const result = await this.getConnection().raw(`
      SELECT *
      FROM ${ShowDatabase.TABLE_NAME} as shows
      JOIN ${ShowDatabase.TABLE_SHOWS} as bands
      WHERE shows.day = "${day}"
    `)

    return result[0];
  }

  public async checkIfIsAvaiable(day: string, start_time: number): Promise<Show[]> {
    const result = await this.getConnection()
      .select("*")
      .from(ShowDatabase.TABLE_NAME)
      .where({ day })
      .andWhere({ start_time });

    return result[0];
  }

}
