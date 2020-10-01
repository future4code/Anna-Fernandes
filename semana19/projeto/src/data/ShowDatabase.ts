import { Show, WeekDay } from "../model/Show";
import { IdGenerator } from "../services/IdGenerator";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_shows";

  public async createShow(
      id: string,
      week_day: WeekDay,
      start_time: number,
      end_time: number,
      band_id: string,
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          week_day,
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
    const result = await this.getConnection()
      .select("*")
      .from(ShowDatabase.TABLE_NAME)
      .where({ id });

    return Show.toShowModel(result[0]);
  }

  public async getShowByWeekDay(week_day: string): Promise<Show> {
    const result = await this.getConnection()
      .select("*")
      .from(ShowDatabase.TABLE_NAME)
      .where({ week_day });

    return Show.toShowModel(result[0]);
  }

}
