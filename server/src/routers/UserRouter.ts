import { Router } from "express";
import { UserService } from "../services/UserService";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { User } from "../models/User";
import { BadRequestError, ServerError, UnauthorizedError } from "../errors";
import { requestHandler } from "../middlewares/RequestHandler";
import { UserTransformer } from "../transformers/UserTransformer";
import { BookTransformer } from "../transformers/BookTransformer";
import { z } from "zod";
import { UniqueViolationError } from "objection";

const userRouter = Router();
const userService = new UserService();
const userTransformer = new UserTransformer();
const bookTransformer = new BookTransformer();
const BookIdSchema = z.number();

userRouter.get('/books', authMiddleware, requestHandler(async (req, res) => {
  return bookTransformer.transformArray(await userService.getUsersReadBooks(res.locals.user.email));
}))

userRouter.post('/books', authMiddleware, requestHandler(async (req, res) => {
  const bookId = BookIdSchema.parse(req.body.bookId);
  try{
    const user = await userService.addBookToRead(res.locals.user.email, bookId);
    if(!user){
      throw new ServerError();
    }
  
    return userTransformer.transform(user);
  }
  catch(e) {
    if(e instanceof UniqueViolationError){
      throw new BadRequestError();
    }

    throw new ServerError()
  }
}))


export { userRouter };