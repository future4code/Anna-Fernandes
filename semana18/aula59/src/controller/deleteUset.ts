import { Request, Response }  from 'express';
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export const deleteUser = async (req: Request, res: Response) => {
    
    const userBusiness = new UserBusiness();
        
    try {
        const input = {
            id: req.params.id,
			token: req.headers.authorization!
        }

        await userBusiness.deleteUser(input);

        res.status(200).send({ message: "User successfully deleted." });

    } catch (error) {
        res.status(400).send({ error: error.message });
    }


    await BaseDatabase.destroyConnection();
}