import { GenreService } from "./GenreService";
import { Book } from "../models/Book";
import { User } from "../models/User";
import { BooksGenre } from "../models/BooksGenre";
import { z } from "zod";

export const BookInputSchema = z.object({
  title: z.string(),
  author: z.string(),
  genres: z.string().array(),
  image: z.string().url(),
});

export const BookUpdateSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
});

export type BookUpdate = z.infer<typeof BookUpdateSchema>;

export class BookService {
  private genres = new GenreService();

  async create(input: {
    title: string;
    author: string;
    user: User;
    genres: string[];
    image: string;
  }): Promise<Book> {
    const transaction = await Book.startTransaction();
    input.genres = input.genres.filter(
      (genre, index) => input.genres.indexOf(genre) === index
    );

    try {
      const book = await Book.query(transaction).insert({
        title: input.title,
        author: input.author,
        userId: input.user.id,
        image: input.image,
      });

      await Promise.all(
        input.genres.map(async (genreName) => {
          const genre = await this.genres.findOrCreate(genreName, transaction);
          return await BooksGenre.query(transaction).insert({
            bookId: book.id,
            genreId: genre.id,
          });
        })
      );

      transaction.commit();
      return book;
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  async update(id: string | number, input: BookUpdate): Promise<Book> {
    const book = await Book.query().findById(id);
    return Book.query().patchAndFetchById(id, {
      title: book?.title && input.title,
      author: book?.author && input.author,
    });
  }

  async all(
    page: number,
    pageSize: number,
    titleLike?: string
  ): Promise<{ books: Book[]; totalCount: number }> {
    titleLike = titleLike
      ? titleLike.replace(/%/g, "\\%").replace(/_/g, "\\_")
      : "";

    const books = await Book.query()
      .where("title", "ilike", `%${titleLike}%`)
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .withGraphFetched("[genres]");
    return { books: books, totalCount: books.length };
  }

  async allWithUploaders(
    page: number,
    pageSize: number
  ): Promise<{ books: Book[]; totalCount: number }> {
    const books = await Book.query()
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .withGraphFetched("[uploader]");
    return { books: books, totalCount: books.length };
  }

  async getAllReaders(id: string | number): Promise<User[]> {
    return await Book.relatedQuery("readers").for(id);
  }

  async findById(id: string | number): Promise<Book | undefined> {
    return await Book.query().findById(id).withGraphFetched('[genres]');
  }
}
