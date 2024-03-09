import { Model } from "objection";
import { BaseModel } from "./BaseModel";
import { Book } from "./Book";
import { Comment} from "./Comment"

export class User extends BaseModel {

  static readonly tableName = 'users'

  name!: string;
  email!: string;
  password!: string;

  books?: Book[];
  comments?: Comment[];
  readBooks?: Book[];

  static get relationMappings() {
    return {
      books: {
        relation: Model.HasManyRelation,
        modelClass: Book,
        join: {
          from: 'users.id',
          to: 'books.userId'
        }
      },

      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'users.id',
          to: 'comments.userId'
        }
      },

      readBooks: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: 'users.id',
          through: {
            from: 'readBooks.userId',
            to: 'readBooks.bookId'
          },
          to: 'books.id'
        }
      }
    }
  }
}