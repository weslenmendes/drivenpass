import { Card } from "@prisma/client";

import cardRepository from "./../repositories/cardRepository.js";
import { generateError } from "./../errors/errorGenerator.js";
import encryptUtils from "./../utils/encryptUtils.js";

export type CreateCardData = Omit<Card, "id">;
type OptionalCardData = Partial<CreateCardData>;

interface newCardData extends CreateCardData {
  CVC: string;
}

async function createCard(cardData: newCardData, userId: number) {
  const { title, CVC, password } = cardData;

  const titleExists = await cardRepository.getCardByTitleAndUserId(
    title,
    userId,
  );

  if (titleExists && titleExists?.userId === userId) {
    throw generateError({
      type: "UnprocessableEntityError",
      message: "This title already exists.",
    });
  }

  const securityCodeEncrypted = encryptUtils.encryptByCryptr(CVC);
  const passwordEncrypted = encryptUtils.encryptByCryptr(password);

  const newCard = cardData;
  newCard.userId = userId;
  newCard.securityCode = securityCodeEncrypted;
  newCard.password = passwordEncrypted;

  delete newCard.CVC;

  await cardRepository.createCard(newCard);
}

async function getCard(id: number, userId: number) {
  const card = await cardExists(id);

  isOwnerOfThatCard(userId, card.userId);

  const cardDecrypted = decryptCard(card);

  return cardDecrypted;
}

async function getCards(userId: number) {
  const cards = await cardRepository.getCardsByUserId(userId);

  const cardsDecrypted = cards.map((card) => decryptCard(card));

  return cardsDecrypted;
}

async function deleteCard(id: number, userId: number) {
  const card = await cardExists(id);

  isOwnerOfThatCard(userId, card.userId);

  await cardRepository.deleteCard(id);
}

function isOwnerOfThatCard(userId: number, ownerId: number) {
  if (userId !== ownerId) {
    throw generateError({
      type: "UnauthorizedError",
      message: "You are not authorized to access this note.",
    });
  }
}

async function cardExists(id: number) {
  const card = await cardRepository.getCardById(id);

  if (!card) {
    throw generateError({
      type: "NotFoundError",
      message: "Card not found.",
    });
  }

  return card;
}

function decryptCard(card: OptionalCardData) {
  const cardDecrypted = card;

  cardDecrypted.securityCode = encryptUtils.decryptByCryptr(card.securityCode);
  cardDecrypted.password = encryptUtils.decryptByCryptr(card.password);

  return cardDecrypted;
}

export default {
  createCard,
  getCard,
  getCards,
  deleteCard,
};
