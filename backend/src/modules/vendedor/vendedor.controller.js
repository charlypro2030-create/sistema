import * as service from "./vendedor.service.js";
import { AppError } from "../../shared/AppError.js";

export async function listVendedores(req, res, next) {
  try {
    const data = await service.listVendedores(req.query);
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

export async function getVendedorById(req, res, next) {
  try {
    const vendedor = await service.getVendedorById(req.params.id);
    return res.json(vendedor);
  } catch (e) {
    next(e);
  }
};

export async function createVendedor(req, res, next) {
  try {
    const vendedor = await service.createVendedor(req.body);
    return res.status(201).json(vendedor);
  } catch (e) {
    next(e);
  }
};

export async function updateVendedor(req, res, next) {
  try {
    const vendedor = await service.updateVendedor(req.params.id, req.body);
    return res.json(vendedor);
  } catch (e) {
    next(e);
  }
};

export async function deleteVendedor(req, res, next) {
  try {
    const vendedor = await service.deleteVendedor(req.params.id);
    return res.json({ deleted: true, vendedor });
  } catch (e) {
    next(e);
  }
};
