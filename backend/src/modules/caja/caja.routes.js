import { Router } from "express";
import { listCajaMovimientos, getCajaMovimientoById, createCajaMovimiento, updateCajaMovimiento, deleteCajaMovimiento } from "./caja.controller.js";

const router = Router();

router.get("/", listCajaMovimientos);
router.get("/:id", getCajaMovimientoById);
router.post("/", createCajaMovimiento);
router.put("/:id", updateCajaMovimiento);
router.delete("/:id", deleteCajaMovimiento);

export default router;
