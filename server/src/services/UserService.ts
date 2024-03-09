import { User } from '../models/User';
import { Book } from '../models/Book';
import { ReadBooks } from '../models/ReadBooks';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const SALT_ROUNDS = 10;

export const LoginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export const RegisterInputSchema = LoginInputSchema.extend({
  name: z.string()
})

export class UserAlreadyExists extends Error {}

export type RegisterInput = z.infer<typeof RegisterInputSchema>
export type LoginInput = z.infer<typeof LoginInputSchema>

export class UserService {

  async register(input: RegisterInput): Promise<User> {
    if(await this.findByEmail(input.email)){
      throw new UserAlreadyExists();
    }
    
    const hashed = await bcrypt.hash(input.password, SALT_ROUNDS);
    return await User.query().insert({name: input.name, email: input.email, password: hashed});
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await User.query().where("email", email).first();
  }

  async findByID(id: string | number): Promise<User | undefined> {
    return await User.query().findById(id);
  }

  async getUsersReadBooks(email: string): Promise<Book[] | undefined>{
    const user = await User.query().findOne('email', email);
    if(!user){
      return undefined;
    }
    return await User.relatedQuery('readBooks').for(user.id).withGraphFetched('[genres]');
  }

  async addBookToRead(email: string, bookId: number): Promise<User | undefined>{
    const user = await this.findByEmail(email);
    if(!user){
      return undefined;
    }
    return (await ReadBooks.query().insert({userId: user.id, bookId: bookId})).$relatedQuery('users').findById(user.id);
  }

  async login(input: LoginInput): Promise<User | undefined>{
    const user = await this.findByEmail(input.email);
    if(!user || !(await bcrypt.compare(input.password, user.password))){
      return;
    }
    return user;
  }
}