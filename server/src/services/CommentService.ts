import { Book } from "../models/Book";
import { Comment } from "../models/Comment";
import { User } from "../models/User";

export class CommentService {
  async create(input: {user: User, book: Book, text: string}): Promise<Comment> {
    return Comment.query().insert({ userId: input.user.id, bookId: input.book.id, text: input.text });
  }

  async update(id: string | number, input: { text: string }): Promise<Comment> {
    return Comment.query().patchAndFetchById(id, input);
  }

  async delete(id: string): Promise<void> {
    await Comment.query().deleteById(id);
  }

  async allForBook(bookId: string | number): Promise<Comment[]> {
    return Comment.query().where("bookId", bookId).withGraphFetched("[book, user]");
  }

  async findById(id: string | number): Promise<Comment | undefined> {
    return Comment.query().findById(id);
  }
}
