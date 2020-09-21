import { Request, Response }  from 'express';
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export const login = async (req: Request, res: Response) => {
    
    try {
        const input = {
            email: req.body.email,
            password: req.body.password
        }

        const userBusiness = new UserBusiness();
        const token = await userBusiness.getUserByEmail(input);


        res.status(200).send({ 
            message: "User login successfully",
            token
         });

    } catch (error) {
        res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
}