import { Router } from "express";
import { listStocks, ajustarStock } from "./stock.controller.js";

const router = Router();

router.get("/", listStocks);
router.post("/ajustes", ajustarStock);

export default router;
