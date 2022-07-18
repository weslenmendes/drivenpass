import { Router } from "express";

import * as networkController from "./../controllers/networkController.js";

import { tokenValidator } from "./../middlewares/authValidationMiddleware.js";
import { validateSchema } from "./../middlewares/validationSchemaMiddleware.js";
import {
  networkSchemaBody as networkSB,
  networkSchemaParams as networkSP,
} from "./../schemas/networkSchema.js";

const networkRouter = Router();

networkRouter.use(tokenValidator);

networkRouter.get("/wifis", networkController.getWifis);
networkRouter.get(
  "/wifis/:id",
  validateSchema(networkSP.schema, networkSP.local),
  networkController.getWifi,
);
networkRouter.post(
  "/wifis",
  validateSchema(networkSB.schema, networkSB.local),
  networkController.addWifi,
);
networkRouter.delete(
  "/wifis/:id",
  validateSchema(networkSP.schema, networkSP.local),
  networkController.removeWifi,
);

export default networkRouter;
