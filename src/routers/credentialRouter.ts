import { Router } from "express";

import { tokenValidator } from "./../middlewares/authValidationMiddleware.js";
import { validateSchema } from "./../middlewares/validationSchemaMiddleware.js";
import {
  credentialSchema,
  credentialSchemaParams as credentialSP,
} from "./../schemas/credentialSchema.js";
import * as credentialController from "./../controllers/credentialController.js";

const credentialRouter = Router();

credentialRouter.use(tokenValidator);

credentialRouter.get("/credentials", credentialController.getCredentials);
credentialRouter.get(
  "/credentials/:id",
  validateSchema(credentialSP.schema, credentialSP.local),
  credentialController.getCredential,
);
credentialRouter.post(
  "/credentials",
  validateSchema(credentialSchema.schema, credentialSchema.local),
  credentialController.addCredential,
);
credentialRouter.delete(
  "/credentials/:id",
  validateSchema(credentialSP.schema, credentialSP.local),
  credentialController.removeCredential,
);

export default credentialRouter;
