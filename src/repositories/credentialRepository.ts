import prisma from "./../config/database.js";

import { CreateCredentialData } from "./../services/credentialService.js";

async function insertCredential(credentialData: CreateCredentialData) {
  await prisma.credential.create({
    data: credentialData,
  });
}

async function getCredentialById(id: number) {
  const credential = await prisma.credential.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      username: true,
      password: true,
    },
  });

  return credential;
}

async function getCredentialsByUserId(userId: number) {
  const credentials = await prisma.credential.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      username: true,
      password: true,
    },
  });

  return credentials;
}

async function getCredentialByTitleAndUserId(title: string, userId: number) {
  const credential = await prisma.credential.findFirst({
    where: {
      title,
      userId,
    },
  });

  return credential;
}

async function deleteCredentialById(id: number) {
  await prisma.credential.delete({
    where: {
      id,
    },
  });
}

export default {
  insertCredential,
  getCredentialById,
  getCredentialsByUserId,
  getCredentialByTitleAndUserId,
  deleteCredentialById,
};
