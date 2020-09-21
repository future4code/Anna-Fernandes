import { Request, Response }  from 'express';
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export const getAll = async (req: Request, res: Response) => {
    
    const userBusiness = new UserBusiness();

    try {
        const token = req.headers.authorization!;
        const users = await userBusiness.get(token);
        
        res.send(users).status(200);

    } catch (error) {
        res.send({ message: error.message }).status(error.status);
    }

    await BaseDatabase.destroyConnection();
}