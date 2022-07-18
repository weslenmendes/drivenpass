import { Request, Response } from "express";

export async function index(req: Request, res: Response) {
  res.send({ message: "DrivenPass is in production and working" });
}
