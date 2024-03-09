import { Request, Response, NextFunction } from "express"
import { UserService } from "../services/UserService";
import { UserTokenService } from "../services/UserTokenSercive";

const userService = new UserService();
const userTokenService = new UserTokenService();

export async function authMiddleware(req: Request, res: Response, next: NextFunction){
  const authHeader = req.headers.authorization;

  if(!authHeader || !(authHeader.startsWith("Bearer "))){
    return res.sendStatus(401);
  }

  const token = authHeader.substring("Bearer ".length);

  if(!token){
    return res.sendStatus(401);
  }

  let data: {id: string};
  try{
    data =  userTokenService.parse(token);
  }
  catch(error){
    console.error(error);
    res.sendStatus(401);
    return;
  }

  if(!data || !data.id){
    return res.sendStatus(401);
  }

  const user = await userService.findByID(data.id);

  if(!user){
    return res.sendStatus(401);
  }

  res.locals.user = user;
  
  next();
}