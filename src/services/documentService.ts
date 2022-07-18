import { Document } from "@prisma/client";

import documentRepository from "./../repositories/documentRepository.js";
import { generateError } from "./../errors/errorGenerator.js";

export type CreateDocumentData = Omit<Document, "id">;

async function createDocument(
  documentData: CreateDocumentData,
  userId: number,
) {
  const newDocument = documentData;
  newDocument.userId = userId;

  await documentRepository.createDocument(newDocument);
}

async function getDocument(id: number, userId: number) {
  const document = await documentExists(id);

  isOwnerOfThatDocument(userId, document.userId);

  return document;
}

async function getDocuments(userId: number) {
  const documents = await documentRepository.getDocumentsByUserId(userId);

  return documents;
}

async function deleteDocument(id: number, userId: number) {
  const document = await documentExists(id);

  isOwnerOfThatDocument(userId, document.userId);

  await documentRepository.deleteDocument(id);
}

function isOwnerOfThatDocument(userId: number, ownerId: number) {
  if (userId !== ownerId) {
    throw generateError({
      type: "UnauthorizedError",
      message: "You are not authorized to access this document.",
    });
  }
}

async function documentExists(id: number) {
  const document = await documentRepository.getDocumentById(id);

  if (!document) {
    throw generateError({
      type: "NotFoundError",
      message: "Document not found.",
    });
  }

  return document;
}

export default {
  createDocument,
  getDocument,
  getDocuments,
  deleteDocument,
};
