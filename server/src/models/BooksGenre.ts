import { Model } from "objection";
import { BaseModel } from "./BaseModel";
import { Book } from "./Book";
import { Genre } from "./Genre";

export class BooksGenre extends BaseModel {

  static readonly tableName = 'booksGenres'

  bookId!: number;
  genreId!: number;

  book?: Book;
  genre?: Genre;

  static get relationMappings() {

    return {

      books: {
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: 'booksGenres.bookId',
          to: 'books.id'
        }
      },

      genres: {
        relation: Model.BelongsToOneRelation,
        modelClass: Genre,
        join: {
          from: 'booksGenres.genreId',
          to: 'genre.id'
        }
      }
    }
  }

}