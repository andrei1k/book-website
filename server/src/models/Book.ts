import { Model } from "objection";
import { BaseModel } from "./BaseModel";
import { Genre } from "./Genre";
import { User } from "./User";
import { Comment } from "./Comment";

export class Book extends BaseModel {

  static readonly tableName = 'books'

  title!: string;
  userId!: number;
  author!: string;
  image?: string

  uploader?: User;
  genres?: Genre[];
  comments?: Comment[];
  readers?: User[];


  static get relationMappings() {

    return {

      uploader: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'books.userId',
          to: 'users.id'
        }
      },

      genres: {
        relation: Model.ManyToManyRelation,
        modelClass: Genre,
        join: {
          from: 'books.id',
          through: {
            from: 'booksGenres.bookId',
            to: 'booksGenres.genreId'
          },
          to: 'genres.id'
        }
      },

      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'books.id',
          to: 'comments.bookId'
        }
      },

      readers: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'books.id',
          through: {
            from: 'readBooks.bookId',
            to: 'readBooks.userId'
          },
          to: 'users.id'
        }
      }
    }
  }

}