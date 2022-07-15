import { Response, Request } from "express";

import * as userService from "./../services/userService.js";

export async function register(req: Request, res: Response) {
  const user: userService.CreateUserData = req.body;

  await userService.register(user);

  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const user: userService.CreateUserData = req.body;

  const token = await userService.login(user);

  res.send(token);
}
