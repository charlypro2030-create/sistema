import * as service from "./cheque.service.js";
import { AppError } from "../../shared/AppError.js";

export async function listCheques(req, res, next) {
  try {
    const data = await service.listCheques(req.query);
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

export async function getChequeById(req, res, next) {
  try {
    const cheque = await service.getChequeById(req.params.id);
    return res.json(cheque);
  } catch (e) {
    next(e);
  }
};

export async function createCheque(req, res, next) {
  try {
    const cheque = await service.createCheque(req.body);
    return res.status(201).json(cheque);
  } catch (e) {
    next(e);
  }
};

export async function updateCheque(req, res, next) {
  try {
    const cheque = await service.updateCheque(req.params.id, req.body);
    return res.json(cheque);
  } catch (e) {
    next(e);
  }
};

export async function deleteCheque(req, res, next) {
  try {
    const cheque = await service.deleteCheque(req.params.id);
    return res.json({ deleted: true, cheque });
  } catch (e) {
    next(e);
  }
};
