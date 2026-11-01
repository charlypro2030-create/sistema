import { Router } from "express";
import { listVentas, getVentaById, createVenta, updateVenta, deleteVenta } from "./venta.controller.js";

const router = Router();

router.get("/", listVentas);
router.get("/:id", getVentaById);
router.post("/", createVenta);
router.put("/:id", updateVenta);
router.delete("/:id", deleteVenta);

export default router;
