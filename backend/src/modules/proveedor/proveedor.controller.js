import * as service from "./proveedor.service.js";
import { AppError } from "../../shared/AppError.js";

export async function listProveedores(req, res, next) {
  try {
    const data = await service.listProveedores(req.query);
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

export async function getProveedorById(req, res, next) {
  try {
    const proveedor = await service.getProveedorById(req.params.id);
    return res.json(proveedor);
  } catch (e) {
    next(e);
  }
};

export async function createProveedor(req, res, next) {
  try {
    const proveedor = await service.createProveedor(req.body);
    return res.status(201).json(proveedor);
  } catch (e) {
    next(e);
  }
};

export async function updateProveedor(req, res, next) {
  try {
    const proveedor = await service.updateProveedor(req.params.id, req.body);
    return res.json(proveedor);
  } catch (e) {
    next(e);
  }
};

export async function deleteProveedor(req, res, next) {
  try {
    const proveedor = await service.deleteProveedor(req.params.id);
    return res.json({ deleted: true, proveedor });
  } catch (e) {
    next(e);
  }
};
