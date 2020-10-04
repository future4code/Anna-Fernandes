import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { EventDatabase } from "./EventDatabase";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_users";

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          password,
          role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return User.toUserModel(result[0]);
  }

  public async getUserById(id: string): Promise<User> {
    const result = await this.getConnection().raw(`
      SELECT user.name, user.email, user.role
      FROM ${UserDatabase.TABLE_NAME} user
      where user.id = "${id}"
    `)

    return User.toUserModel(result[0][0]);
  }

  public async getProfile(id: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT user.id, user.name, user.email, user.role
      FROM ${UserDatabase.TABLE_NAME} user
      where user.id = "${id}"
    `)

    const user:any = result[0][0] 

    const eventDatabase = new EventDatabase();
    const tickets = await eventDatabase.getTicketsByUser(user.id)
    
    const profile: any = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      tickets: tickets[0],
    }

    return profile;
  }

  public async getAllUsers(): Promise<User[]> {
    const result = await this.getConnection().raw(`
      SELECT user.name, user.email, user.role
      FROM ${UserDatabase.TABLE_NAME} user
    `)

    return result[0];
  }

}
