import { Router } from "express";

import * as cardController from "./../controllers/cardController.js";
import { tokenValidator } from "./../middlewares/authValidationMiddleware.js";
import { validateSchema } from "./../middlewares/validationSchemaMiddleware.js";
import {
  cardSchemaBody as cardSB,
  cardSchemaParams as cardSP,
} from "./../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.use(tokenValidator);

cardRouter.get("/cards", cardController.getCards);
cardRouter.get(
  "/cards/:id",
  validateSchema(cardSP.schema, cardSP.local),
  cardController.getCard,
);
cardRouter.post(
  "/cards",
  validateSchema(cardSB.schema, cardSB.local),
  cardController.createCard,
);
cardRouter.delete(
  "/cards/:id",
  validateSchema(cardSP.schema, cardSP.local),
  cardController.deleteCard,
);

export default cardRouter;
