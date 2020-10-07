import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { NotFoundError } from "../error/NotFoundError";
import { UnauthorizedError } from "../error/UnauthorizedError";

export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    async createUser(user: UserInputDTO) {

        if (!user.name || !user.email || !user.password || !user.role) {
            throw new InvalidParameterError("Missing input.");
        }

        if (user.email.indexOf("@") === -1) {
            throw new InvalidParameterError("Invalid email.");
        }

        if (user.password.length < 6) {
            throw new InvalidParameterError("Invalid password.");
        }

        const id = this.idGenerator.generate();

        const hashPassword = await this.hashManager.hash(user.password);

        await this.userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const accessToken = this.authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        if (!user.email || !user.password) {
            throw new InvalidParameterError("Missing input.");
        }

        const userFromDB = await this.userDatabase.getUserByEmail(user.email);

        if (!userFromDB) {
            throw new NotFoundError("User not found.");
        }

        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword());
        
        const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        const role = this.authenticator.getData(accessToken).role;

        if (!hashCompare) {
            throw new InvalidParameterError("Invalid password!");
        }

        return { accessToken, role};
    }

    async getProfile(token: string) {
        
        const accessToken = this.authenticator.getData(token);

        if (!token) {
            throw new UnauthorizedError("You have to be logged in to do that.");
        }

        const userFromDB = await this.userDatabase.getProfile(accessToken.id);
        
        if (!userFromDB) {
            throw new NotFoundError("No user found.");
        }

        return userFromDB;
    }

    async getUserById(userId: string) {

        const userFromDB = await this.userDatabase.getUserById(userId);

        if (!userFromDB) {
            throw new NotFoundError("There is no user with this id.");
        }

        return userFromDB;
    }

    async getAllUsers(token: string) {

        const accessToken = this.authenticator.getData(token);

        if (!accessToken) {
            throw new UnauthorizedError("You don't have permission to do that.");
        }

        const usersFromDB = await this.userDatabase.getAllUsers();

        if (!usersFromDB) {
            throw new NotFoundError("There is no users register.");
        }

        return usersFromDB;
    }
}