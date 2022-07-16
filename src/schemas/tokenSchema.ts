import Joi from "joi";

export const tokenSchema = Joi.object({
  authorization: Joi.string()
    .pattern(/^Bearer\s[\w-]*\.[\w-]*\.[\w-]*$/)
    .required(),
})
  .messages({
    "string.pattern.base": "Invalid token",
    "string.pattern.base.required": "Token is required",
  })
  .options({
    allowUnknown: true,
  });
