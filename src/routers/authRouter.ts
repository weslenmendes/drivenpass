import { Router } from "express";

import * as authController from "./../controllers/authController.js";

import { validateSchema } from "./../middlewares/validationSchemaMiddleware.js";
import { userSchema } from "./../schemas/userSchema.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateSchema(userSchema.schema, userSchema.local),
  authController.register,
);
authRouter.post(
  "/sign-in",
  validateSchema(userSchema.schema, userSchema.local),
  authController.signIn,
);

export default authRouter;
