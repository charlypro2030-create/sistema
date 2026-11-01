import * as service from "./stock.service.js";
import { AppError } from "../../shared/AppError.js";

export async function listStocks(req, res, next) {
  try {
    const data = await service.listStocks(req.query);
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

export async function ajustarStock(req, res, next) {
  try {
    const articulo = await service.ajustarStock(req.body);
    return res.json(articulo);
  } catch (e) {
    next(e);
  }
};
