import Joi from "joi";

import { regex } from "./../utils/constantsUtils.js";

type Local = "body" | "query" | "params" | "headers";

interface schema {
  schema: Joi.Schema;
  local: Local;
}

export const userSchema: schema = {
  schema: Joi.object()
    .keys({
      email: Joi.string().email().pattern(regex.EMAIL).required(),
      password: Joi.string().min(10).required(),
    })
    .messages({
      "string.email": "It should be an email",
      "string.pattern.base": "This email does not comply with validation",
      "string.min": "The password must be at least 10 characters long",
      "string.required": "The email and password are required.",
    }),
  local: "body",
};
