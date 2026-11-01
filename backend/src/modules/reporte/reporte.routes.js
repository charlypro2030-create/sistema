import { Router } from "express";
import { getResumenVentasDelDia, getVentasEntreFechas, getResumenComprasDelDia, getComprasEntreFechas, getVentasPorClienteEntreFechas } from "./reporte.controller.js";

const router = Router();

router.get("/ventas/resumen-del-dia", getResumenVentasDelDia);
router.get("/ventas/entre-fechas", getVentasEntreFechas);
router.get("/compras/resumen-del-dia", getResumenComprasDelDia);
router.get("/compras/entre-fechas", getComprasEntreFechas);
router.get("/clientes/entre-fechas", getVentasPorClienteEntreFechas);

export default router;
