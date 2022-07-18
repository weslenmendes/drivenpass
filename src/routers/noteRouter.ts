import { Router } from "express";

import * as noteController from "./../controllers/noteController.js";
import { tokenValidator } from "./../middlewares/authValidationMiddleware.js";
import { validateSchema } from "./../middlewares/validationSchemaMiddleware.js";
import {
  noteSchemaBody as noteSB,
  noteSchemaParams as noteSP,
} from "./../schemas/noteSchema.js";

const noteRouter = Router();

noteRouter.get("/notes", tokenValidator, noteController.getNotes);

noteRouter.get(
  "/notes/:id",
  tokenValidator,
  validateSchema(noteSP.schema, noteSP.local),
  noteController.getNote,
);

noteRouter.post(
  "/notes",
  tokenValidator,
  validateSchema(noteSB.schema, noteSB.local),
  noteController.createNote,
);

noteRouter.delete(
  "/notes/:id",
  tokenValidator,
  validateSchema(noteSP.schema, noteSP.local),
  noteController.deleteNote,
);

export default noteRouter;
