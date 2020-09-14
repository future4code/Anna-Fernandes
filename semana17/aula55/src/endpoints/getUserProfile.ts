import {Request, Response} from 'express'
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';

export const getUserProfile = async (req: Request, res: Response ) => {
try{

  const token = req.headers.authorization as string;

  const authenticator = new Authenticator();
  const authenticationData = authenticator.getData(token);

  const userDatabase = new UserDatabase();
  const user = await userDatabase.getUserById(authenticationData.id)


  if(!user) {
    throw new Error('Usuário não encontrado')
  }

  res.status(200).send({
      id: user.id,
      email: user.email,
  })

}catch(e) {
  res.status(e.statusCode || 400).send({
    message: e.message
  })
}

}