import * as service from "./listaprecios.service.js";
import { AppError } from "../../shared/AppError.js";

export async function listListas(req, res, next) {
  try {
    const data = await service.listListas(req.query);
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

export async function getListaById(req, res, next) {
  try {
    const lista = await service.getListaById(req.params.id);
    return res.json(lista);
  } catch (e) {
    next(e);
  }
};

export async function createLista(req, res, next) {
  try {
    const lista = await service.createLista(req.body);
    return res.status(201).json(lista);
  } catch (e) {
    next(e);
  }
};

export async function updateLista(req, res, next) {
  try {
    const lista = await service.updateLista(req.params.id, req.body);
    return res.json(lista);
  } catch (e) {
    next(e);
  }
};

export async function deleteLista(req, res, next) {
  try {
    const lista = await service.deleteLista(req.params.id);
    return res.json({ deleted: true, lista });
  } catch (e) {
    next(e);
  }
};

export async function recalcularPrecios(req, res, next) {
  try {
    const { listaId } = req.params;
    const resultado = await service.recalcularPrecios(listaId);
    return res.json(resultado);
  } catch (e) {
    next(e);
  }
};
