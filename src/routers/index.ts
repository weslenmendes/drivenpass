import { Router } from "express";

import initialRouter from "./initialRouter.js";
import authRouter from "./authRouter.js";
import credentialRouter from "./credentialRouter.js";
import noteRouter from "./noteRouter.js";
import cardRouter from "./cardRouter.js";
import networkRouter from "./networkRouter.js";
import documentRouter from "./documentRouter.js";

const router = Router();

router.use(initialRouter);
router.use(authRouter);
router.use(credentialRouter);
router.use(noteRouter);
router.use(cardRouter);
router.use(networkRouter);
router.use(documentRouter);

export default router;
