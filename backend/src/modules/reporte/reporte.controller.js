import * as service from "./reporte.service.js";
import { AppError } from "../../shared/AppError.js";

export async function getResumenVentasDelDia(req, res, next) {
  try {
    const data = await service.getResumenVentasDelDia();
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

export async function getVentasEntreFechas(req, res, next) {
  try {
    const data = await service.getVentasEntreFechas({
      desde: req.query.desde,
      hasta: req.query.hasta,
    });
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

export async function getResumenComprasDelDia(req, res, next) {
  try {
    const data = await service.getResumenComprasDelDia();
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

export async function getComprasEntreFechas(req, res, next) {
  try {
    const data = await service.getComprasEntreFechas({
      desde: req.query.desde,
      hasta: req.query.hasta,
    });
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

export async function getVentasPorClienteEntreFechas(req, res, next) {
  try {
    const data = await service.getVentasPorClienteEntreFechas({
      desde: req.query.desde,
      hasta: req.query.hasta,
    });
    return res.json(data);
  } catch (e) {
    next(e);
  }
};
