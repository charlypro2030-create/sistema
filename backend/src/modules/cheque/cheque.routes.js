import { Router } from "express";
import { listCheques, getChequeById, createCheque, updateCheque, deleteCheque } from "./cheque.controller.js";

const router = Router();

router.get("/", listCheques);
router.get("/:id", getChequeById);
router.post("/", createCheque);
router.put("/:id", updateCheque);
router.delete("/:id", deleteCheque);

export default router;
