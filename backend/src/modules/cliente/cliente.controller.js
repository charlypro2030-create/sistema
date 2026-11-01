import * as service from "./cliente.service.js";
import { AppError } from "../../shared/AppError.js";

export async function listClientes(req, res, next) {
  try {
    const data = await service.listClientes(req.query);
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

export async function getClienteById(req, res, next) {
  try {
    const cliente = await service.getClienteById(req.params.id);
    return res.json(cliente);
  } catch (e) {
    next(e);
  }
};

export async function createCliente(req, res, next) {
  try {
    const cliente = await service.createCliente(req.body);
    return res.status(201).json(cliente);
  } catch (e) {
    next(e);
  }
};

export async function updateCliente(req, res, next) {
  try {
    const cliente = await service.updateCliente(req.params.id, req.body);
    return res.json(cliente);
  } catch (e) {
    next(e);
  }
};

export async function deleteCliente(req, res, next) {
  try {
    const cliente = await service.deleteCliente(req.params.id);
    return res.json({ deleted: true, cliente });
  } catch (e) {
    next(e);
  }
};
