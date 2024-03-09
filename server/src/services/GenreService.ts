import { Transaction } from "objection";
import { Genre } from "../models/Genre";

export class GenreService {
  async create(name: string): Promise<Genre> {
    return await Genre.query().insert({name: name});
  }

  async findByName(name: string): Promise<Genre | undefined> {
    return await Genre.query().where("name", name).first();
  }

  async findOrCreate(name: string, transaction?: Transaction): Promise<Genre> {
    const found = await Genre.query(transaction).findOne("name", name);
    if(!found){
      return await Genre.query(transaction).insert({name: name});
    }
    return found;
  }
}