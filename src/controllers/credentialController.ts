import { Request, Response } from "express";

import credentialService from "./../services/credentialService.js";

export async function getCredential(req: Request, res: Response) {
  const userId = +res.locals.user.id;
  const id = +req.params.id;

  const credential = await credentialService.getCredential(id, userId);

  res.send(credential);
}

export async function getCredentials(_req: Request, res: Response) {
  const userId = +res.locals.user.id;

  const credentials = await credentialService.getCredentials(userId);

  res.send(credentials);
}

export async function addCredential(req: Request, res: Response) {
  const userId = +res.locals.user.id;
  const credential = req.body;

  await credentialService.createCredential(credential, userId);

  res.status(201).send({ message: "Credential created." });
}

export async function removeCredential(req: Request, res: Response) {
  const userId = +res.locals.user.id;
  const id = +req.params.id;

  await credentialService.deleteCredential(id, userId);

  res.send({ message: "Credential deleted." });
}
