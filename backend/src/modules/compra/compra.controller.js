import * as service from "./compra.service.js";
import { AppError } from "../../shared/AppError.js";

export async function listCompras(req, res, next) {
  try {
    const data = await service.listCompras(req.query);
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

export async function getCompraById(req, res, next) {
  try {
    const compra = await service.getCompraById(req.params.id);
    return res.json(compra);
  } catch (e) {
    next(e);
  }
};

export async function createCompra(req, res, next) {
  try {
    const compra = await service.createCompra(req.body);
    return res.status(201).json(compra);
  } catch (e) {
    next(e);
  }
};

export async function updateCompra(req, res, next) {
  try {
    const compra = await service.updateCompra(req.params.id, req.body);
    return res.json(compra);
  } catch (e) {
    next(e);
  }
};

export async function deleteCompra(req, res, next) {
  try {
    const compra = await service.deleteCompra(req.params.id);
    return res.json({ deleted: true, compra });
  } catch (e) {
    next(e);
  }
};
