import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {

    async createUser(user: user) {

        const idGenerator = new IdGenerator();
        const hashManager = new HashManager();
        const userDatabase = new UserDatabase();
        const authenticator = new Authenticator();

        try{

            if(!user.name || !user.email || !user.password || !user.role){
                throw new Error("Please fill all the fields");
            }

            if(user.email.indexOf("@") === -1){
                throw new Error("Invalid Email");
            }

            if(user.password.length < 6){
                throw new Error("Password must have at least 6 characters");
            }

            const id = idGenerator.generate();
            const hashPassword = await hashManager.hash(user.password);
            await userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);
            const token = authenticator.generateToken({id});
            
            return token;

        } catch(error){
            throw new Error( error.message || "Error creating user. Please check your system administrator.");
        }
    }

    async getUserByEmail(input: {email:string, password:string}) {

        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(input.email);

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(input.password, userFromDB.getPassword());

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId()});

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }
    
    async get(token: string) {
        const authenticator = new Authenticator();

        const userDatabase = new UserDatabase();
        authenticator.getData(token);
        return await userDatabase.get();
    }

    async deleteUser(input: {id:string, token:string}) {
        const userDatabase = new UserDatabase();
        const authenticator = new Authenticator();

        const verifiedToken = authenticator.getData(input.token);

        if(verifiedToken.role !== "ADMIN"){
            throw new Error("Apenas administradores podem deletar usuários!")
        }

        return await userDatabase.deleteUser(input.id);
    }

}

export type user = {
    name: string,
    email: string,
    password: string,
    role: USER_ROLES
}

export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}