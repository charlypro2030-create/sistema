import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, NavLink } from "react-router-dom";
import ArticulosPage from "./modules/articulos/ArticulosPage";
import ListasPreciosPage from "./modules/listaprecios/ListasPreciosPage";
import StockPage from "./modules/stock/StockPage";
import ClientesPage from "./modules/cliente/ClientesPage";
import ComprasPage from "./modules/compra/ComprasPage";
import VentasPage from "./modules/venta/VentasPage";
import ChequesPage from "./modules/cheque/ChequesPage";
import ProveedoresPage from "./modules/proveedor/ProveedoresPage";
import CajaPage from "./modules/caja/CajaPage";
import ReportesPage from "./modules/reporte/ReportesPage";
import IndicadoresPage from "./modules/indicador/IndicadoresPage";
import VendedoresPage from "./modules/vendedor/VendedoresPage";

const queryClient = new QueryClient();

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex gap-6">
        <NavLink to="/articulos" className="text-sm font-medium text-gray-700 hover:text-blue-600">
          Artículos
        </NavLink>
        <NavLink to="/listas-precios" className="text-sm font-medium text-gray-700 hover:text-blue-600">
          Listas de Precios
        </NavLink>
        <NavLink to="/stock" className="text-sm font-medium text-gray-700 hover:text-blue-600">
          Stock
        </NavLink>
        <NavLink to="/clientes" className="text-sm font-medium text-gray-700 hover:text-blue-600">
          Clientes
        </NavLink>
        <NavLink to="/compras" className="text-sm font-medium text-gray-700 hover:text-blue-600">
          Compras
        </NavLink>
        <NavLink to="/ventas" className="text-sm font-medium text-gray-700 hover:text-blue-600">
          Ventas
        </NavLink>
        <NavLink to="/cheques" className="text-sm font-medium text-gray-700 hover:text-blue-600">
          Cheques
        </NavLink>
        <NavLink to="/proveedores" className="text-sm font-medium text-gray-700 hover:text-blue-600">
          Proveedores
        </NavLink>
        <NavLink to="/caja" className="text-sm font-medium text-gray-700 hover:text-blue-600">
          Caja
        </NavLink>
        <NavLink to="/reportes" className="text-sm font-medium text-gray-700 hover:text-blue-600">
          Reportes
        </NavLink>
        <NavLink to="/indicadores" className="text-sm font-medium text-gray-700 hover:text-blue-600">
          Indicadores
        </NavLink>
        <NavLink to="/vendedores" className="text-sm font-medium text-gray-700 hover:text-blue-600">
          Vendedores
        </NavLink>
      </nav>

      <Routes>
        <Route path="/articulos" element={<ArticulosPage />} />
        <Route path="/listas-precios" element={<ListasPreciosPage />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/compras" element={<ComprasPage />} />
        <Route path="/ventas" element={<VentasPage />} />
        <Route path="/cheques" element={<ChequesPage />} />
        <Route path="/proveedores" element={<ProveedoresPage />} />
        <Route path="/caja" element={<CajaPage />} />
        <Route path="/reportes" element={<ReportesPage />} />
        <Route path="/indicadores" element={<IndicadoresPage />} />
        <Route path="/vendedores" element={<VendedoresPage />} />
        <Route path="*" element={<Navigate to="/articulos" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
