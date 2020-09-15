import { Request, Response} from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';

export const login = async (req: Request, res: Response) => {
  try {

    const userData = {
      email: req.body.email,
      password: req.body.password
    }

    if(!userData.password || !userData.email) {
      throw new Error('Insira todas as informações necessárias para o cadastro')
    }

    if(userData.email.indexOf('@') === -1) {
      throw new Error('Email inválido')
    }

    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserByEmail(userData.email)

    const passwordIsCorrect: boolean = await new HashManager().compare(userData.password, user.password)
    
    if(passwordIsCorrect) {
      throw new Error('Usuário ou senha inválidos');
    }

    const authenticatior = new Authenticator();
    const token = authenticatior.generateToken({
      id: user.id,
      role: user.role
    });

    res.status(200).send({
      message: 'Usuário logado com sucesso',
      token
    })

  } catch(e) {
    res.status(400).send({
      message: e.message
    })
  } finally {
    await BaseDatabase.destroyConnection();
  }
}