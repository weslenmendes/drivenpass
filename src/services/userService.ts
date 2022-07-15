import { User } from "@prisma/client";

import userRepository from "./../repositories/userRepository.js";
import { generateError } from "./../errors/errorGenerator.js";
import encryptUtils from "./../utils/encryptUtils.js";
import tokenUtils from "./../utils/tokenUtils.js";

export type CreateUserData = Omit<User, "id">;

export async function register(user: CreateUserData) {
  const userData = await userExists(user.email);

  if (userData) {
    throw generateError({
      type: "UnauthorizedError",
      message: "Choose another email.",
    });
  }

  const newUserData = user;
  const hashedPassword = encryptUtils.encryptPassword(user.password);
  newUserData.password = hashedPassword;

  await userRepository.register(newUserData);
}

export async function login(user: CreateUserData) {
  const userData = await userExists(user.email);

  const isTheSamePassword = encryptUtils.decryptPassword(
    user.password,
    userData.password,
  );

  if (!isTheSamePassword) {
    throw generateError({
      type: "UnauthorizedError",
      message: "The password is incorrect.",
    });
  }

  const token = tokenUtils.generateToken({ userId: userData.id });

  return { token };
}

async function userExists(email: string) {
  const userData = await userRepository.getUserByEmail(email);
  return userData;
}
