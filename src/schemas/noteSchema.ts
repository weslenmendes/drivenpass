import Joi from "joi";

import { regex } from "./../utils/constantsUtils.js";

type Local = "body" | "query" | "params" | "headers";

interface schema {
  schema: Joi.Schema;
  local: Local;
}

export const noteSchemaBody: schema = {
  schema: Joi.object()
    .keys({
      title: Joi.string().min(5).max(50).required().label("title"),
      content: Joi.string().min(5).max(1000).required().label("content"),
    })
    .messages({
      "title.required": "Title is required.",
      "title.min": "Title must be at least 5 characters.",
      "title.max": "Title must be at most 50 characters.",
      "content.required": "Content is required.",
      "content.min": "Content must be at least 5 characters.",
      "content.max": "Content must be at most 1000 characters.",
    }),
  local: "body",
};

export const noteSchemaParams: schema = {
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
