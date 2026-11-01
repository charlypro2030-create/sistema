import { Router } from "express";
import { listProveedores, getProveedorById, createProveedor, updateProveedor, deleteProveedor } from "./proveedor.controller.js";

const router = Router();

router.get("/", listProveedores);
router.get("/:id", getProveedorById);
router.post("/", createProveedor);
router.put("/:id", updateProveedor);
router.delete("/:id", deleteProveedor);

export default router;
