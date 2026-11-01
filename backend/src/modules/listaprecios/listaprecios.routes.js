import { Router } from "express";
import {
  listListas,
  getListaById,
  createLista,
  updateLista,
  deleteLista,
  recalcularPrecios,
} from "./listaprecios.controller.js";

const router = Router();

router.get("/", listListas);
router.get("/:id", getListaById);
router.post("/", createLista);
router.put("/:id", updateLista);
router.delete("/:id", deleteLista);
router.post("/:id/recalcular", recalcularPrecios);

export default router;
