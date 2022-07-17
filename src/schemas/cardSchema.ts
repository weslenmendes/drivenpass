import Joi from "joi";

import { regex } from "./../utils/constantsUtils.js";

type Local = "body" | "query" | "params" | "headers";

interface schema {
  schema: Joi.Schema;
  local: Local;
}

export const cardSchemaBody: schema = {
  schema: Joi.object().keys({
    title: Joi.string().required().min(3).label("title").messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters",
    }),
    number: Joi.string()
      .pattern(regex.NUMBER)
      .required()
      .label("number")
      .messages({
        "string.pattern.base":
          "Invalid card number, must be a string with 14 to 16 digits, without spaces",
        "string.empty": "Card number is required",
        "string.required": "Card number is required",
      }),
    holderName: Joi.string()
      .pattern(regex.HOLDERNAME)
      .required()
      .label("holderName")
      .messages({
        "string.pattern.base":
          "Invalid holder name, must be a string with 3 to 24 characters, without spaces and must not start with a number",
      }),
    CVC: Joi.string().pattern(regex.CVC).required().label("CVC").messages({
      "string.pattern.base":
        "Invalid CVC number, must be a string with 3 to 4 digits",
      "string.empty": "CVC is required",
      "string.required": "CVC is required",
    }),
    expirationDate: Joi.string()
      .length(5)
      .pattern(regex.DATE)
      .required()
      .messages({
        "string.length": "Invalid expiration date",
        "string.pattern.base":
          "Invalid expiration date, must be a string with 5 characters in format MM/YY",
      }),
    password: Joi.string()
      .pattern(/^[0-9]{4}$/)
      .required()
      .label("password")
      .messages({
        "string.pattern.base": "Password must be 4 digits long",
        "string.empty": "Password is required",
        "string.required": "Password is required",
      }),
    isVirtual: Joi.boolean().required().label("isVirtual").messages({
      "boolean.empty": "Is virtual is required",
      "boolean.required": "Is virtual is required",
    }),
    type: Joi.string()
      .valid("credit", "debit", "both")
      .required()
      .label("type")
      .messages({
        "string.empty": "Type is required",
        "string.required": "Type is required",
        "string.valid": 'Invalid type, must be "credit", "debit" or "both"',
      }),
  }),
  local: "body",
};

export const cardSchemaParams: schema = {
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
