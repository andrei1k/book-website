import { Book } from "../models/Book";

export class BookTransformer{
  transform(book: Book){
    return {id: book.id, title: book.title, author: book.author, genres: book.genres?.map(genre => genre.name), image: book.image};
  }

  transformArray(books: Book[] | undefined){
    if(!books){
      return [];
    }
    return books.map(book => this.transform(book));
  }
}