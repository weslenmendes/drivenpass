import { Router } from "express";

import * as initialController from "./../controllers/initialController.js";

const initialRouter = Router();

initialRouter.get("/", initialController.index);

export default initialRouter;
