import { Request, Response } from "express";

import cardService from "./../services/cardService.js";

export async function createCard(req: Request, res: Response) {
  const userId = +res.locals.user.id;
  const cardData = req.body;

  await cardService.createCard(cardData, userId);

  res.status(201).send({ message: "Card created." });
}

export async function getCard(req: Request, res: Response) {
  const userId = +res.locals.user.id;
  const cardId = +req.params.id;

  const card = await cardService.getCard(cardId, userId);

  res.status(200).send(card);
}

export async function getCards(req: Request, res: Response) {
  const userId = +res.locals.user.id;

  const cards = await cardService.getCards(userId);

  res.status(200).send(cards);
}

export async function deleteCard(req: Request, res: Response) {
  const userId = +res.locals.user.id;
  const cardId = +req.params.id;

  await cardService.deleteCard(cardId, userId);

  res.status(200).send({ message: "Card deleted." });
}
