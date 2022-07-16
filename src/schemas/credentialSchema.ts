import Joi from "joi";

import { regex } from "./../utils/constantsUtils.js";

type Local = "body" | "query" | "params" | "headers";

interface schema {
  schema: Joi.Schema;
  local: Local;
}

export const credentialSchema: schema = {
  schema: Joi.object()
    .keys({
      title: Joi.string().min(3).required(),
      url: Joi.string().uri().required(),
      username: Joi.string().pattern(regex.USERNAME).required(),
      password: Joi.string().min(1).required(),
    })
    .messages({
      "string.min": "Password must be at least 1 characters",
      "string.pattern": "Username must be alphanumeric",
      "string.uri": "URL must be valid",
      "string.required": "Title, URL, username and password are required",
    }),
  local: "body",
};

export const credentialSchemaParams: schema = {
  schema: Joi.object()
    .keys({
      id: Joi.string().required(),
    })
    .messages({
      "string.required": "Id is required",
    }),
  local: "params",
};
