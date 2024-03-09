import { Book } from "../../src/models/Book"
import { BookService } from "../../src/services/BookService"
import { UserService } from "../../src/services/UserService"
import { createBook, createUser } from "../support/factories"

describe('BookService', () => {
  describe('#create', () => {
    it('can create book with genres', async () => {
      const bookService = new BookService();
      const user = await createUser();

      const book = await bookService.create({title: 'Ratatue', author: 'unknown', user: user, genres: ['comedy', 'horror']});
      const genres = (await Book.relatedQuery('genres').for(book.id)).map(genre => genre.name);

      expect(book.userId).toEqual(user.id);
      expect(book.title).toEqual('Ratatue');
      expect(genres.sort()).toEqual(['horror', 'comedy'].sort());
    })

    it('can create book without dublicating its genres', async () => {
      const bookService = new BookService();
      const user = await createUser();

      const book = await bookService.create({title: 'Ratatue', author: 'unknown', user: user, genres: ['comedy', 'horror', 'comedy', 'comedy', 'horror']});
      const genres = (await Book.relatedQuery('genres').for(book.id)).map(genre => genre.name);

      expect(book.userId).toEqual(user.id);
      expect(book.title).toEqual('Ratatue');
      expect(genres).toEqual(['comedy', 'horror']);
    })
  })

  describe('#update', () => {
    it('can update only by given title', async () => {
      const bookService = new BookService();

      const book = await createBook({title: 'Second book'});
      const updatedBook = await bookService.update(`${book.id}`, {title: 'first book'});

      expect(updatedBook.title).toEqual('first book');
    })

    it('can update only by given author', async () => {
      const bookService = new BookService();

      const book = await createBook({author: 'Astrind Lindgren'});
      const updatedBook = await bookService.update(`${book.id}`, {author: 'Lindgren'});

      expect(updatedBook.author).toEqual('Lindgren');
    })

    it('can update author and title', async () => {
      const bookService = new BookService();

      const book = await createBook({author: 'Astrind Lindgren', title: 'pipi'});
      const updatedBook = await bookService.update(`${book.id}`, {author: 'Lindgren', title: 'Pipi longsocks'});

      expect(updatedBook.author).toEqual('Lindgren');
      expect(updatedBook.title).toEqual('Pipi longsocks');
    })
    
    it('does not change anything when non is provided', async () => {
      const bookService = new BookService();

      const book = await createBook({author: 'Astrind Lindgren', title: 'pipi'});
      const updatedBook = await bookService.update(`${book.id}`, {});

      expect(updatedBook.author).toEqual('Astrind Lindgren');
      expect(updatedBook.title).toEqual('pipi');
    })

    it('returns undefined if book with given id does not exists', async () => {
      const bookService = new BookService();

      const updatedBook = await bookService.update('1', {title: 'expection'});

      expect(updatedBook).toBeUndefined();
    })
  })

  describe('#findById', () => {
    it('returns book if book with this id exists', async () => {
      const bookService = new BookService();
      const book = await createBook();

      expect(await bookService.findById(`${book.id}`)).toEqual(book);
    })

    it('returns undefined if book with this id does not exist', async () => {
      const bookService = new BookService();

      expect(await bookService.findById('1')).toBeUndefined();
    })
  })

  describe('#getAllReaders', () => {
    it('returns array of all users that have read this book', async () => {
      const userService = new UserService();
      const bookService = new BookService();

      const user1 = await createUser({email: 'userone@gmail.com'})
      const user2 = await createUser({email: 'usertwo@gmail.com'})
      const book = await createBook();

      await userService.addBookToRead('userone@gmail.com', book.id)
      await userService.addBookToRead('usertwo@gmail.com', book.id)

      expect(await bookService.getAllReaders(`${book.id}`)).toEqual([user1, user2]);
    })

    it('returns empty array if noone have read the book', async () => {
      const bookService = new BookService();

      const book = await createBook();

      expect(await bookService.getAllReaders(`${book.id}`)).toEqual([]);
    })

    it('return empty array if book with given id does not exists', async () => {
      const bookService = new BookService();

      expect(await bookService.getAllReaders('1')).toEqual([]);
    })
  })

  describe('#all', () => {
    it('returns all books on given page with given size and their number', async () => {
      const bookService = new BookService();
      const user = await createUser();
      const books: Book[] = [];

      for(let i = 0; i < 5; i++){
        books.push(await createBook({title: `book ${i}`, userId: user.id}));
      }

      expect(await bookService.all(2, 2)).toEqual({books: [books[2], books[3]], totalCount: 2});
      expect(await bookService.all(1, 3)).toEqual({books: [books[0], books[1], books[2]], totalCount: 3});
      expect(await bookService.all(5, 3)).toEqual({books: [], totalCount: 0});
    })
  })

  describe('allWithUploaders', () => {
    it('returns all books and their publishers on given page with given size and their number', async () => {
      const bookService = new BookService();
      const user = await createUser();
      const books: Book[] = [];

      for(let i = 0; i < 5; i++){
        books.push(await createBook({title: `book ${i}`, userId: user.id, uploader: user}));
      }

      expect(await bookService.allWithUploaders(2, 2)).toEqual({books: [books[2], books[3]], totalCount: 2});
      expect(await bookService.allWithUploaders(1, 3)).toEqual({books: [books[0], books[1], books[2]], totalCount: 3});
      expect(await bookService.allWithUploaders(5, 3)).toEqual({books: [], totalCount: 0});
    })
  })
})