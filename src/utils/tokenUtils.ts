import jwt from "jsonwebtoken";

import { generateError } from "./../errors/errorGenerator.js";

const privateKey = process.env.JWT_PRIVATE_KEY;
const expiration = process.env.JWT_EXPIRATION_AT || "1d";

function generateToken(info: any) {
  const data = { ...info };
  const expirationIn = { expiresIn: expiration };

  const token = jwt.sign(data, privateKey, expirationIn);

  return token;
}

function validateToken(token: string) {
  let data = null;

  jwt.verify(token, privateKey, function (err, decoded) {
    const errorName = err.name || "";

    if (errorName === "TokenExpiredError")
      throw generateError({
        type: "UnauthorizedError",
        message: "This token is expired.",
      });

    if (errorName === "JsonWebTokenError")
      throw generateError({ type: "UnauthorizedError", message: err.message });

    if (errorName === "NotBeforeError")
      throw generateError({
        type: "UnauthorizedError",
        message: "This token is not active yet.",
      });

    data = decoded;
  });

  return data;
}

export default {
  generateToken,
  validateToken,
};
