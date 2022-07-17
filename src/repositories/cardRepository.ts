import prisma from "./../config/database.js";

import { CreateCardData } from "./../services/cardService.js";

const cardSelect = {
  id: true,
  userId: true,
  title: true,
  number: true,
  holderName: true,
  securityCode: true,
  password: true,
  isVirtual: true,
  type: true,
};

async function getCardsByUserId(userId: number) {
  const cards = await prisma.card.findMany({
    where: {
      userId,
    },
    select: cardSelect,
  });

  return cards;
}

async function getCardById(id: number) {
  const card = await prisma.card.findUnique({
    where: {
      id,
    },
    select: cardSelect,
  });

  return card;
}

async function getCardByTitleAndUserId(title: string, userId: number) {
  const card = await prisma.card.findFirst({
    where: {
      title,
      userId,
    },
    select: cardSelect,
  });

  return card;
}

async function createCard(cardData: CreateCardData) {
  await prisma.card.create({
    data: cardData,
  });
}

async function deleteCard(id: number) {
  await prisma.card.delete({
    where: {
      id,
    },
  });
}

export default {
  getCardsByUserId,
  getCardById,
  getCardByTitleAndUserId,
  createCard,
  deleteCard,
};
