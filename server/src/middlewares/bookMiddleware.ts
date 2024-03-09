import { Request, Response, NextFunction } from "express"
import { User } from "../models/User";
import { BookService } from "../services/BookService";
import { BookIdSchema } from "../routers/BookRouter";
import { ZodError } from "zod";

const bookService = new BookService();

export async function bookMiddleware(req: Request, res: Response, next: NextFunction) {
  const user: User = res.locals.user;
  let bookId: number;
  try {
    bookId = BookIdSchema.parse(req.params).id
  }
  catch {
    return res.sendStatus(400);
  }
  const book = await bookService.findById(bookId);
  
  if(!book){
    return res.sendStatus(404);
  }
  if(book.userId != user.id){
    return res.sendStatus(401);
  }

  res.locals.bookId = bookId;  
  next();
}