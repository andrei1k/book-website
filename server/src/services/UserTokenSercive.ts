import jwt from 'jsonwebtoken';
import { User } from "../models/User";
import { config } from '../config';

export class UserTokenService {
  create(user: User): string {
    return jwt.sign({ id: user.id, username: user.name }, config.get('jwtSecret'), { expiresIn: '1h' })
  }

  parse(token: string) {
    return jwt.verify(token, config.get('jwtSecret')) as { id: string }
  }
}
