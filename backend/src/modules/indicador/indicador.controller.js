import * as service from "./indicador.service.js";
import { AppError } from "../../shared/AppError.js";

export async function getIndicadores(req, res, next) {
  try {
    const data = await service.getIndicadores();
    return res.json(data);
  } catch (e) {
    next(e);
  }
};
