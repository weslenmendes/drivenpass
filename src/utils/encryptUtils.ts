import Cryptr from "cryptr";
import bcrypt from "bcrypt";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

function encryptSecurityCode(password: string) {
  return cryptr.encrypt(password);
}

function decryptSecurityCode(encryptedSecurityCode: string) {
  return cryptr.decrypt(encryptedSecurityCode);
}

function encryptPassword(password: string) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

function decryptPassword(password: string, encryptedPassword: string) {
  if (!encryptedPassword) return true;

  return bcrypt.compareSync(password, encryptedPassword);
}

export default {
  encryptPassword,
  encryptSecurityCode,
  decryptPassword,
  decryptSecurityCode,
};
