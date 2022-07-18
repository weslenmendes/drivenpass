import { Request, Response } from "express";

import documentService from "./../services/documentService.js";

export async function getDocument(req: Request, res: Response) {
  const userId = +res.locals.user.id;
  const id = +req.params.id;

  const document = await documentService.getDocument(id, userId);

  res.send(document);
}

export async function getDocuments(req: Request, res: Response) {
  const userId = +res.locals.user.id;

  const documents = await documentService.getDocuments(userId);

  res.send(documents);
}

export async function addDocument(req: Request, res: Response) {
  const userId = +res.locals.user.id;
  const documentData = req.body;

  await documentService.createDocument(documentData, userId);

  res.status(201).send({ message: "Document created." });
}

export async function removeDocument(req: Request, res: Response) {
  const userId = +res.locals.user.id;
  const id = +req.params.id;

  await documentService.deleteDocument(id, userId);

  res.send({ message: "Document deleted." });
}
