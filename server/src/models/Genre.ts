import { Model } from "objection";
import { BaseModel } from "./BaseModel";
import { Book } from "./Book";

export class Genre extends BaseModel {

  static readonly tableName = 'genres'

  name!: string;

  books?: Book[];

  static get relationMappings() {

    return {

      books: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: 'genres.id',
          through: {
            from: 'booksGenres.genreId',
            to: 'booksGenres.bookId'
          },
          to: 'books.id'
        }
      }
    }
  }

}