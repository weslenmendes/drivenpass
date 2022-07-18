import Joi from "joi";

import { regex } from "./../utils/constantsUtils.js";

type Local = "body" | "query" | "params" | "headers";

interface schema {
  schema: Joi.Schema;
  local: Local;
}

export const networkSchemaBody: schema = {
  schema: Joi.object().keys({
    title: Joi.string().required().min(3).label("title").messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters",
    }),
    name: Joi.string().required().messages({
      "string.empty": "Name is required",
      "string.required": "Name is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
      "string.required": "Password is required",
    }),
  }),
  local: "body",
};

export const networkSchemaParams: schema = {
  schema: Joi.object()
    .keys({
      id: Joi.string().pattern(regex.ID).required(),
    })
    .messages({
      "string.required": "Id is required",
      "string.pattern": "Id must be a number",
    }),
  local: "params",
};
