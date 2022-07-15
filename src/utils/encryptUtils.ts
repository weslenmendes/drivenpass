import Cryptr from "cryptr";
import bcrypt from "bcrypt";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

function encryptByCryptr(password: string) {
  return cryptr.encrypt(password);
}

function decryptByCryptr(encryptedSecurityCode: string) {
  return cryptr.decrypt(encryptedSecurityCode);
}

function encryptByBcrypt(password: string) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

function decryptByBcrypt(password: string, encryptedPassword: string) {
  if (!encryptedPassword) return true;

  return bcrypt.compareSync(password, encryptedPassword);
}

export default {
  encryptByCryptr,
  decryptByCryptr,
  encryptByBcrypt,
  decryptByBcrypt,
};
