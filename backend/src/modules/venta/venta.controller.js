import * as service from "./venta.service.js";
import { AppError } from "../../shared/AppError.js";

export async function listVentas(req, res, next) {
  try {
    const data = await service.listVentas(req.query);
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

export async function getVentaById(req, res, next) {
  try {
    const venta = await service.getVentaById(req.params.id);
    return res.json(venta);
  } catch (e) {
    next(e);
  }
};

export async function createVenta(req, res, next) {
  try {
    const venta = await service.createVenta(req.body);
    return res.status(201).json(venta);
  } catch (e) {
    next(e);
  }
};

export async function updateVenta(req, res, next) {
  try {
    const venta = await service.updateVenta(req.params.id, req.body);
    return res.json(venta);
  } catch (e) {
    next(e);
  }
};

export async function deleteVenta(req, res, next) {
  try {
    const venta = await service.deleteVenta(req.params.id);
    return res.json({ deleted: true, venta });
  } catch (e) {
    next(e);
  }
};
