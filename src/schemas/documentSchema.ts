import Joi from "joi";

import { regex } from "./../utils/constantsUtils.js";

type Local = "body" | "query" | "params" | "headers";

interface schema {
  schema: Joi.Schema;
  local: Local;
}

export const documentSchemaBody: schema = {
  schema: Joi.object().keys({
    fullName: Joi.string().min(4).pattern(regex.FULLNAME).required().messages({
      "string.pattern.base": "Full name must be at least 3 characters",
      "string.min": "Full name must be at least 3 characters",
      "string.empty": "Name is required",
      "string.required": "Name is required",
    }),
    number: Joi.string()
      .min(8)
      .max(12)
      .pattern(regex.ONLYNUMBER)
      .required()
      .messages({
        "string.pattern.base":
          "Number must be at least 8 characters, only numbers",
        "string.empty": "Number of document is required",
        "string.required": "Number of document is required",
      }),
    emissionDate: Joi.string()
      .length(10)
      .pattern(regex.DATE_EXT)
      .required()
      .messages({
        "string.pattern.base": "Emission date must be in format DD/MM/YYYY",
        "string.empty": "Emission date is required",
        "string.required": "Emission date is required",
        "string.length": "Emission date must be 10 characters",
      }),
    expirationDate: Joi.string()
      .length(10)
      .pattern(regex.DATE_EXT)
      .required()
      .messages({
        "string.pattern.base": "Expiration date must be in format DD/MM/YYYY",
        "string.empty": "Expiration date is required",
        "string.required": "Expiration date is required",
        "string.length": "Expiration date must be 10 characters",
      }),
    emissorName: Joi.string().required().min(3).max(50).messages({
      "string.min": "Emissor name must be at least 3 characters",
      "string.max": "Emissor name must be at most 50 characters",
      "string.empty": "Emissor name is required",
      "string.required": "Emissor name is required",
    }),
    type: Joi.string().valid("rg", "cnh").required().messages({
      "string.required": "Type is required",
      "string.valid": 'Type must be "rg" or "cnh"',
    }),
  }),
  local: "body",
};

export const documentSchemaParams: schema = {
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
