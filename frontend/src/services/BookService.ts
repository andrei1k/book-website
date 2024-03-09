import { Book } from "../components/BookCard";
import { HttpService } from "./HttpService";

export const DEFAULT_IMAGE =
  "https://img.freepik.com/premium-photo/opened-book-with-flying-pages-butterflies-dark-backgroundgenerative-ai_391052-12859.jpg";

interface BookResponse {
  books: Book[];
  count: number;
}

interface BookParameters {
  title: string;
  author: string;
  genres: string;
  image: string;
}

class BookService {
  private http: HttpService;
  constructor() {
    this.http = new HttpService();
  }

  async getBooks(titleLike: string) {
    const query = new URLSearchParams({
      page: "1",
      pageSize: "10",
      titleLike: titleLike,
    });

    const queryString = query.toString();

    const result = await this.http.get<BookResponse>(`books?${queryString}`);

    return result.books;
  }

  async getBookByID(id: number | string) {
    return await this.http.get<Book>(`books/${id}`);
  }

  async addBookToRead(bookId: number) {
    await this.http.post("/users/books", { body: { bookId } });
  }

  async getReadBooks() {
    return await this.http.get<Book[]>("users/books");
  }

  async createBook(input: BookParameters) {
    const genres = input.genres !== "" ? input.genres.split(" ") : undefined;
    const title = input.title || undefined;
    const author = input.author || undefined;
    const image = input.image !== DEFAULT_IMAGE ? input.image : undefined;

    return await this.http.post<{ id: number; title: string; author: string }>(
      "/books",
      { body: { title, author, genres, image } }
    );
  }
}

export const bookService = new BookService();
