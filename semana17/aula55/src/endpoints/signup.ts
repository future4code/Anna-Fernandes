import { Request, Response} from 'express';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';

export const signup = async (req: Request, res: Response) => {
  try {

    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    if(!userData.name || !userData.password || !userData.email) {
      throw new Error('Insira todas as informações necessárias para o cadastro')
    }

    if(userData.email.indexOf("@") === -1) {
      throw new Error('Email inválido')
    }

    if(userData.password.length < 6) {
        throw new Error('Senha inválida. Ela deve ter mais do que 6 caracteres.')
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const userDatabase = new UserDatabase();
    await userDatabase.createUser(
      id,
      userData.name,
      userData.email,
      userData.password
    );

    const authenticatior = new Authenticator();
    const token = authenticatior.generateToken({id});

    res.status(200).send({
      message: 'Usuário criado com sucesso',
      token
    })

  } catch(err) {
    res.status(400).send({
      message: err.message
    })
  }
}