import { Router } from "express";

import * as documentController from "./../controllers/documentController.js";
import { tokenValidator } from "./../middlewares/authValidationMiddleware.js";
import { validateSchema } from "./../middlewares/validationSchemaMiddleware.js";
import {
  documentSchemaBody as documentSB,
  documentSchemaParams as documentSP,
} from "./../schemas/documentSchema.js";

const documentRouter = Router();

documentRouter.get(
  "/documents",
  tokenValidator,
  documentController.getDocuments,
);
documentRouter.get(
  "/documents/:id",
  tokenValidator,
  validateSchema(documentSP.schema, documentSP.local),
  documentController.getDocument,
);
documentRouter.post(
  "/documents",
  tokenValidator,
  validateSchema(documentSB.schema, documentSB.local),
  documentController.addDocument,
);
documentRouter.delete(
  "/documents/:id",
  tokenValidator,
  validateSchema(documentSP.schema, documentSP.local),
  documentController.removeDocument,
);

export default documentRouter;
