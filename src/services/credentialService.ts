import { Credential } from "@prisma/client";

import credentialRepository from "./../repositories/credentialRepository.js";
import { generateError } from "./../errors/errorGenerator.js";
import encryptUtils from "./../utils/encryptUtils.js";

export type CreateCredentialData = Omit<Credential, "id">;

async function createCredential(
  credentialData: CreateCredentialData,
  userId: number,
) {
  const { title, password } = credentialData;

  const titleExists = await credentialRepository.getCredentialByTitleAndUserId(
    title,
    userId,
  );

  if (titleExists && titleExists?.userId === userId) {
    throw generateError({
      type: "UnprocessableEntityError",
      message: "This title already exists.",
    });
  }

  const newCredential = credentialData;
  newCredential.password = encryptUtils.encryptByCryptr(password);
  newCredential.userId = userId;

  await credentialRepository.insertCredential(newCredential);
}

async function getCredential(id: number, userId: number) {
  const credential = await credentialExists(id);

  await isOwnerOfThatCredential(userId, credential.userId);

  credential.password = encryptUtils.decryptByCryptr(credential.password);

  return credential;
}

async function getCredentials(userId: number) {
  const credentials = await credentialRepository.getCredentialsByUserId(userId);

  credentials.forEach((credential) => {
    credential.password = encryptUtils.decryptByCryptr(credential.password);
  });

  return credentials;
}

async function deleteCredential(id: number, userId: number) {
  const credential = await credentialExists(id);

  await isOwnerOfThatCredential(userId, credential.userId);

  await credentialRepository.deleteCredentialById(id);
}

async function credentialExists(id: number) {
  const credential = await credentialRepository.getCredentialById(id);

  if (!credential) {
    throw generateError({
      type: "NotFoundError",
      message: "Credential not found.",
    });
  }

  return credential;
}

function isOwnerOfThatCredential(userId: number, ownerId: number) {
  if (userId !== ownerId) {
    throw generateError({
      type: "UnauthorizedError",
      message: "You are not authorized to access this credential.",
    });
  }
}

export default {
  createCredential,
  getCredential,
  getCredentials,
  deleteCredential,
};
