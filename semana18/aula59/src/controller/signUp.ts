import { Request, Response }  from 'express';
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export const signup = async (req: Request, res: Response) => {

    const userBusiness = new UserBusiness();
    
    try {
        const input = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            role: req.body.role
        }

        const token = await userBusiness.createUser(input);

        res.status(200).send({ 
            message: "User created successfully",
            token
        });

    } catch (error) {
        res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
}