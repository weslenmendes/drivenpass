import prisma from "../config/database.js";

import { CreateUserData } from "./../services/userService.js";

async function register(userData: CreateUserData) {
  await prisma.user.create({
    data: userData,
  });
}

async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      credentials: true,
      notes: true,
      cards: true,
      wirellesNetworks: true,
      documents: true,
    },
  });
  return user;
}

async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      credentials: true,
      notes: true,
      cards: true,
      wirellesNetworks: true,
      documents: true,
    },
  });
  return user;
}

export default {
  register,
  getUserById,
  getUserByEmail,
};
