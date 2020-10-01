import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {

  private static TABLE_NAME = "";

  public async getShowById(id: string): Promise<Show> {
    const result = await this.getConnection()
      .select("*")
      .from(ShowDatabase.TABLE_NAME)
      .where({ id });

    return Show.toShowModel(result[0]);
  }

}
