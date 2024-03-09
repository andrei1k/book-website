import { NextFunction, Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../errors";
import { NotFoundError, UniqueViolationError } from "objection";
import { ZodError } from "zod";

export function requestHandler<T>(operation: (req: Request, res: Response, next: NextFunction) => Promise<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await operation(req, res, next);

        if(req.method === 'POST') {
          res.status(201);
        }

        res.send(result);
    } catch(e) {
      if(e instanceof BadRequestError) {
        return res.status(400).send({message: e.message});
      }
      if(e instanceof UnauthorizedError){
        return res.sendStatus(401);
      }
      if(e instanceof NotFoundError) {
        return res.sendStatus(404);
      }
      if (e instanceof ZodError) {
        return res.status(400).send(e.flatten());
      }
      if(e instanceof UniqueViolationError){
        return res.sendStatus(400);
      }
      
      console.log('Unhandled error', e);
      return res.sendStatus(500);
    }
  }
}