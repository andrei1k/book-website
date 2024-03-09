import { Router } from "express";
import { LoginInputSchema, RegisterInputSchema, UserService } from "../services/UserService";
import { BadRequestError, UnauthorizedError } from "../errors";
import { requestHandler } from "../middlewares/RequestHandler";
import { UserTokenService } from "../services/UserTokenSercive";
import { UserTransformer } from "../transformers/UserTransformer";

export const authRouter = Router();
const userService = new UserService();
const userTokenService = new UserTokenService();
const userTransformer = new UserTransformer();

authRouter.post('/register', requestHandler(async (req, res) => {
  const registerInput = RegisterInputSchema.parse(req.body);
  return userTransformer.transform(await userService.register(registerInput));
}))

authRouter.post('/login', requestHandler(async (req, res) => {
  const loginInput = LoginInputSchema.parse(req.body);
  const user = await userService.login(loginInput);
  
  if(!user){
    throw new BadRequestError('wrong email or password');
  }

  const token = userTokenService.create(user);
  return {user: userTransformer.transform(user), token: token};
}))