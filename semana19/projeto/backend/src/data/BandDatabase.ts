import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_bands";

  public async createBand(
    id: string,
    name: string,
    music_genre: string,
    responsible: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          music_genre,
          responsible
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getBandById(id: string): Promise<Band> {
    const result = await this.getConnection()
      .select("*")
      .from(BandDatabase.TABLE_NAME)
      .where({ id });

    return result[0];
  }

  public async getBandByQuery(query: string): Promise<Band> {
    const result = await this.getConnection().raw(`
      SELECT *
      FROM lama_bands as band
    `)

    return result;
  }

}
