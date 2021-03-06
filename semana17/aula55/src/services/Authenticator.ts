import * as jwt from 'jsonwebtoken';
import { tokenToString } from 'typescript';
import { USER_ROLES } from '../data/UserDatabase';

export class Authenticator {
    private static EXPIRES_IN = "1min";
    
    public generateToken(input: AuthenticationData): string {
        const token = jwt.sign(
            input,
            process.env.JWT_KEY as string,
            {
                expiresIn: Authenticator.EXPIRES_IN,
            }
        );
        return token;
    }

  public getData(token: string): AuthenticationData {
   const payload = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as any
    const result = {
      id: payload.id,
      role: payload.role
    }
    return result
  }
}

export interface AuthenticationData {
  id: string;
  role: USER_ROLES;
}