import * as service from "./caja.service.js";
import { AppError } from "../../shared/AppError.js";

export async function listCajaMovimientos(req, res, next) {
  try {
    const data = await service.listCajaMovimientos(req.query);
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

export async function getCajaMovimientoById(req, res, next) {
  try {
    const movimiento = await service.getCajaMovimientoById(req.params.id);
    return res.json(movimiento);
  } catch (e) {
    next(e);
  }
};

export async function createCajaMovimiento(req, res, next) {
  try {
    const movimiento = await service.createCajaMovimiento(req.body);
    return res.status(201).json(movimiento);
  } catch (e) {
    next(e);
  }
};

export async function updateCajaMovimiento(req, res, next) {
  try {
    const movimiento = await service.updateCajaMovimiento(req.params.id, req.body);
    return res.json(movimiento);
  } catch (e) {
    next(e);
  }
};

export async function deleteCajaMovimiento(req, res, next) {
  try {
    const movimiento = await service.deleteCajaMovimiento(req.params.id);
    return res.json({ deleted: true, movimiento });
  } catch (e) {
    next(e);
  }
};
