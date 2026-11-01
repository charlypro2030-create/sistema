import { Router } from "express";
import { getIndicadores } from "./indicador.controller.js";

const router = Router();

router.get("/", getIndicadores);

export default router;
