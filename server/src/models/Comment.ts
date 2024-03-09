import { Model } from "objection";
import { BaseModel } from "./BaseModel";
import { Book } from "./Book";
import { User } from "./User";

export class Comment extends BaseModel {

  static readonly tableName = 'comments';

  text!: string;
  bookId!: number;
  userId!: number;

  book?: Book;
  user?: User;

  static get relationMappings() {

    return {

      book: {
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: 'comments.bookId',
          to: 'books.id'
        }
      },

      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'comments.userId',
          to: 'users.id'
        }
      }
    }
  }

}