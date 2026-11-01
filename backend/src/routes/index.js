import { Router } from "express";

const router = Router();

// Módulo Artículos
import articulosRoutes from "../modules/articulos/articulos.routes.js";

// Módulo Listas de Precios
import listapreciosRoutes from "../modules/listaprecios/listaprecios.routes.js";

// Módulo Stock
import stockRoutes from "../modules/stock/stock.routes.js";

// Módulo Clientes
import clienteRoutes from "../modules/cliente/cliente.routes.js";

// Módulo Compras
import compraRoutes from "../modules/compra/compra.routes.js";

// Módulo Ventas
import ventaRoutes from "../modules/venta/venta.routes.js";

// Módulo Cheques
import chequeRoutes from "../modules/cheque/cheque.routes.js";

// Módulo Proveedores
import proveedorRoutes from "../modules/proveedor/proveedor.routes.js";

// Módulo Caja
import cajaRoutes from "../modules/caja/caja.routes.js";

// Módulo Reportes
import reporteRoutes from "../modules/reporte/reporte.routes.js";

// Módulo Indicadores
import indicadorRoutes from "../modules/indicador/indicador.routes.js";

// Módulo Vendedores
import vendedorRoutes from "../modules/vendedor/vendedor.routes.js";

router.use("/articulos", articulosRoutes);
router.use("/listas-precios", listapreciosRoutes);
router.use("/stock", stockRoutes);
router.use("/clientes", clienteRoutes);
router.use("/compras", compraRoutes);
router.use("/ventas", ventaRoutes);
router.use("/cheques", chequeRoutes);
router.use("/proveedores", proveedorRoutes);
router.use("/caja", cajaRoutes);
router.use("/reportes", reporteRoutes);
router.use("/indicadores", indicadorRoutes);
router.use("/vendedores", vendedorRoutes);

export default router;
