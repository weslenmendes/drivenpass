import prisma from "./../config/database.js";

import { CreateDocumentData } from "./../services/documentService.js";

const documentSelect = {
  id: true,
  userId: true,
  fullName: true,
  emissionDate: true,
  expirationDate: true,
  number: true,
  emissorName: true,
  type: true,
};

async function getDocumentsByUserId(userId: number) {
  const documents = await prisma.document.findMany({
    where: {
      userId,
    },
    select: documentSelect,
  });

  return documents;
}

async function getDocumentById(id: number) {
  const document = await prisma.document.findUnique({
    where: {
      id,
    },
    select: documentSelect,
  });

  return document;
}

async function getDocumentByUserId(userId: number) {
  const document = await prisma.document.findFirst({
    where: {
      userId,
    },
    select: documentSelect,
  });

  return document;
}

async function createDocument(documentData: CreateDocumentData) {
  await prisma.document.create({
    data: documentData,
  });
}

async function deleteDocument(id: number) {
  await prisma.document.delete({
    where: {
      id,
    },
  });
}

export default {
  getDocumentsByUserId,
  getDocumentById,
  getDocumentByUserId,
  createDocument,
  deleteDocument,
};
