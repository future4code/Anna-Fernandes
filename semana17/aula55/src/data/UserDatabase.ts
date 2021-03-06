import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME: string = 'User';

  public async createUser(id: string, name: string, email: string, password: string, role: USER_ROLES): Promise<void> {
    await this.getConnection()
    .insert({
      id,
      name, 
      email,
      password,
      role
    }).into(UserDatabase.TABLE_NAME)
  }

  public async getUserByEmail(email: string): Promise<any> {
      try {
        const result = await this.getConnection()
        .select('*')
        .from(UserDatabase.TABLE_NAME)
        .where({email})
        return result[0]

      } catch(err) {
          console.log(err)
      }
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(UserDatabase.TABLE_NAME)
      .where({id})
      return result[0]
  }

  public async deleteUser(id: string): Promise<any> {
    await this.getConnection()
      .delete()
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
  }
}

export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
}