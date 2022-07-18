import { Router } from "express";

import * as networkController from "./../controllers/networkController.js";

import { tokenValidator } from "./../middlewares/authValidationMiddleware.js";
import { validateSchema } from "./../middlewares/validationSchemaMiddleware.js";
import {
  networkSchemaBody as networkSB,
  networkSchemaParams as networkSP,
} from "./../schemas/networkSchema.js";

const networkRouter = Router();

networkRouter.get("/networks", tokenValidator, networkController.getWifis);

networkRouter.get(
  "/networks/:id",
  tokenValidator,
  validateSchema(networkSP.schema, networkSP.local),
  networkController.getWifi,
);

networkRouter.post(
  "/networks",
  tokenValidator,
  validateSchema(networkSB.schema, networkSB.local),
  networkController.addWifi,
);

networkRouter.delete(
  "/networks/:id",
  tokenValidator,
  validateSchema(networkSP.schema, networkSP.local),
  networkController.removeWifi,
);

export default networkRouter;
