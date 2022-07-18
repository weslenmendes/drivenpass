import { Router } from "express";

import * as cardController from "./../controllers/cardController.js";
import { tokenValidator } from "./../middlewares/authValidationMiddleware.js";
import { validateSchema } from "./../middlewares/validationSchemaMiddleware.js";
import {
  cardSchemaBody as cardSB,
  cardSchemaParams as cardSP,
} from "./../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.get("/cards", tokenValidator, cardController.getCards);

cardRouter.get(
  "/cards/:id",
  tokenValidator,
  validateSchema(cardSP.schema, cardSP.local),
  cardController.getCard,
);

cardRouter.post(
  "/cards",
  tokenValidator,
  validateSchema(cardSB.schema, cardSB.local),
  cardController.createCard,
);

cardRouter.delete(
  "/cards/:id",
  tokenValidator,
  validateSchema(cardSP.schema, cardSP.local),
  cardController.deleteCard,
);

export default cardRouter;
