import { stat } from "fs"
import { BaseModel } from "./BaseModel"
import { Model } from "objection";
import { User } from "./User";
import { Book } from "./Book";

export class ReadBooks extends BaseModel{

  static readonly tableName = 'readBooks';

  id!: number;
  userId!: number;
  bookId!: number;

  users?: User;
  books?: Book;

  static get relationMappings(){

    return {

      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'readBooks.userId',
          to: 'users.id'
        }
      },

      books: {
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: 'readBooks.bookId',
          to: 'books.id'
        }
      }
    };
  }


}