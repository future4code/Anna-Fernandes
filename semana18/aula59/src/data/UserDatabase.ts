import { USER_ROLES } from "../business/UserBusiness";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "User_Arq";
  
  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
		role: USER_ROLES
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
  
  public async getUserByEmail(email: string): Promise<any> {
    try {

      const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ email });
			if(!result[0]){
				throw new Error("Usuário não encontrado");
			}
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  
  async get(): Promise<any[]> {

    try {

        const users: any = [];

        const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME);

        for(let user of result){
            users.push(user);
        }

        return users;

    } catch (error) {
        throw new Error(error.sqlMessage || error.message);
    }
  }

  public async deleteUser(
    id: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .where({ id })
        .from(UserDatabase.TABLE_NAME)
        .del()
        
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

}
