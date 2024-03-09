import { Router } from "express";
import { CommentService } from "../services/CommentService";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { BadRequestError, UnauthorizedError } from "../errors";
import { requestHandler } from "../middlewares/RequestHandler";
import { User } from "../models/User";
import { BookService } from "../services/BookService";
import { number, z } from "zod";
import { Book } from "../models/Book";
import { CommentTransformer } from "../transformers/CommentTransformer";
import { BookTransformer } from "../transformers/BookTransformer";
import { UserTransformer } from "../transformers/UserTransformer";

const commentRouter = Router();
const bookService = new BookService();
const commnetService = new CommentService();
export const commentTransformer = new CommentTransformer(new BookTransformer(), new UserTransformer());

const CommentTextSchema = z.object({
  text: z.string()
})

const CommentInputSchema = CommentTextSchema.extend({
  bookId: z.string()
})

const CommentParamsSchema = z.object({
  id: z.coerce.number()
})

commentRouter.post('/', authMiddleware, requestHandler(async (req, res) => {
  const commentInput = CommentInputSchema.parse(req.body);
  const book = await bookService.findById(commentInput.bookId);

  if(!book){
    throw new BadRequestError('Invalid book index');
  }

  return commentTransformer.transform(await commnetService.create({user: res.locals.user, book: book, text: commentInput.text}));
}))

commentRouter.patch("/:id", authMiddleware, requestHandler(async (req, res) => {
  const { id: commentId } = CommentParamsSchema.parse(req.params)
  const commentText = CommentTextSchema.parse(req.body);
  const comment = await commnetService.findById(commentId);

  if(comment?.userId !== res.locals.user.id){
    throw new UnauthorizedError();
  }
  
  return commentTransformer.transform(await commnetService.update(commentId, commentText));
}))

export {commentRouter};