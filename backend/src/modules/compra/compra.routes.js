import { Router } from "express";
import { listCompras, getCompraById, createCompra, updateCompra, deleteCompra } from "./compra.controller.js";

const router = Router();

router.get("/", listCompras);
router.get("/:id", getCompraById);
router.post("/", createCompra);
router.put("/:id", updateCompra);
router.delete("/:id", deleteCompra);

export default router;
