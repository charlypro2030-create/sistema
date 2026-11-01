import * as articulosService from "./articulos.service.js";
import { AppError } from "../../shared/AppError.js";

export async function listArticulos(req, res, next) {
  try {
    const data = await articulosService.listArticulos(req.query);
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

export async function getArticuloById(req, res, next) {
  try {
    const articulo = await articulosService.getArticuloById(req.params.id);
    return res.json(articulo);
  } catch (e) {
    next(e);
  }
};

export async function createArticulo(req, res, next) {
  try {
    const articulo = await articulosService.createArticulo(req.body);
    return res.status(201).json(articulo);
  } catch (e) {
    next(e);
  }
};

export async function updateArticulo(req, res, next) {
  try {
    const articulo = await articulosService.updateArticulo(req.params.id, req.body);
    return res.json(articulo);
  } catch (e) {
    next(e);
  }
};

export async function deleteArticulo(req, res, next) {
  try {
    const articulo = await articulosService.deleteArticulo(req.params.id);
    return res.json({ deleted: true, articulo });
  } catch (e) {
    next(e);
  }
};
