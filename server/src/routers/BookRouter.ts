import { Router } from "express";
import { BookInputSchema, BookService, BookUpdateSchema } from "../services/BookService";
import { CommentService } from "../services/CommentService";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { NotFoundError } from "../errors";
import { requestHandler } from "../middlewares/RequestHandler";
import { z } from "zod";
import { BookTransformer } from "../transformers/BookTransformer";
import { bookMiddleware } from "../middlewares/bookMiddleware";
import { commentTransformer } from "./CommentRoute";

const bookRouter = Router();
const bookService = new BookService();
const commentService = new CommentService();
const bookTransformer = new BookTransformer();

const PaginatorSchema = z.object({
  page: z.coerce.number().min(1),
  pageSize: z.coerce.number().min(1),
  titleLike: z.string().optional()
})

export const BookIdSchema = z.object({
  id: z.coerce.number()
})

bookRouter.get('/',requestHandler(async (req, res) => {
  const {page, pageSize, titleLike} = PaginatorSchema.parse(req.query);

  const books = await bookService.all(page, pageSize, titleLike);
  return {books: bookTransformer.transformArray(books.books), count: books.totalCount};
}))

bookRouter.post('/', authMiddleware, requestHandler(async (req, res) => {
  const bookInfo = BookInputSchema.parse(req.body)
  const user = res.locals.user;
  return bookTransformer.transform(await bookService.create({user: user, ...bookInfo}));
}))

bookRouter.patch('/:id', authMiddleware, bookMiddleware, requestHandler(async (req, res) => {
  const bookUpdateInfo = BookUpdateSchema.parse(req.body);
  return bookTransformer.transform(await bookService.update(res.locals.bookId, bookUpdateInfo));
}))

bookRouter.get('/:id', requestHandler(async (req, res) => {
  const { id: bookId } = BookIdSchema.parse(req.params)
  
  const book = await bookService.findById(bookId)
  
  if(!book){
    throw new NotFoundError();
  }
  return bookTransformer.transform(book);
}))

bookRouter.delete('/:id/comments', authMiddleware, bookMiddleware, requestHandler(async (req, res) => {
  const commentsId = (await commentService.allForBook(res.locals.bookId)).map(comment => comment.id);
  await Promise.all(commentsId.map(id => commentService.delete(`${id}`)));
  return 'Deleted';
}))

bookRouter.get('/:id/comments', authMiddleware, bookMiddleware, requestHandler(async (req, res) => {
  return commentTransformer.transformArrayWithLessInfo(await commentService.allForBook(res.locals.bookId))
}))

export { bookRouter };

