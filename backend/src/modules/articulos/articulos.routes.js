import { Router } from "express";
import {
  listArticulos,
  getArticuloById,
  createArticulo,
  updateArticulo,
  deleteArticulo,
} from "./articulos.controller.js";

const router = Router();

// Health del modulo
router.get("/health", (req, res) => {
  res.json({ module: "articulos", status: "ok" });
});

// Listado (con busqueda, filtros, paginacion y orden)
router.get("/", listArticulos);

// Detalle
router.get("/:id", getArticuloById);

// Crear
router.post("/", createArticulo);

// Actualizar
router.put("/:id", updateArticulo);

// Soft delete
router.delete("/:id", deleteArticulo);

export default router;
