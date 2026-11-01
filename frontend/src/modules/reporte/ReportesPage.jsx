import { useState } from "react";
import { useResumenVentasDelDia, useVentasEntreFechas, useResumenComprasDelDia, useComprasEntreFechas, useVentasPorClienteEntreFechas } from "./hooks/useReportes";

export default function ReportesPage() {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const { data: resumenVentas, isLoading: isLoadingVentasResumen, isError: isErrorVentasResumen } = useResumenVentasDelDia();
  const { data: ventas, isLoading: isLoadingVentas, isError: isErrorVentas } = useVentasEntreFechas({ desde, hasta });

  const { data: resumenCompras, isLoading: isLoadingComprasResumen, isError: isErrorComprasResumen } = useResumenComprasDelDia();
  const { data: compras, isLoading: isLoadingCompras, isError: isErrorCompras } = useComprasEntreFechas({ desde, hasta });

  const { data: ventasPorCliente, isLoading: isLoadingPorCliente, isError: isErrorPorCliente } = useVentasPorClienteEntreFechas({ desde, hasta });

  const kpisVentas = [
    { label: "Día", value: resumenVentas?.dia },
    { label: "Total Ventas", value: resumenVentas?.totalVentas },
    { label: "Cantidad Ventas", value: resumenVentas?.cantidadVentas },
  ];

  const kpisCompras = [
    { label: "Día", value: resumenCompras?.dia },
    { label: "Total Compras", value: resumenCompras?.totalCompras },
    { label: "Cantidad Compras", value: resumenCompras?.cantidadCompras },
  ];

  const renderKpiGrid = (kpis, loading, error) => {
    if (loading) return <div className="p-4 bg-white rounded-lg text-gray-500">Cargando...</div>;
    if (error) return <div className="p-4 bg-white rounded-lg text-red-600">Error</div>;
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="p-4 bg-white rounded-lg border">
            <div className="text-sm text-gray-500">{k.label}</div>
            <div className="text-2xl font-bold text-gray-800">{k.value}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderTable = (data, error, loading, totalKey, cantKey) => {
    if (loading) return <div className="text-gray-500">Cargando...</div>;
    if (error) return <div className="text-red-600">Error</div>;
    const rows = data?.porDia ?? [];
    if (rows.length === 0) return <div className="p-6 text-center text-gray-500">Sin datos</div>;
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left">Fecha</th>
              <th className="px-3 py-2 text-left">{totalKey}</th>
              <th className="px-3 py-2 text-left">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.dia} className="border-t">
                <td className="px-3 py-2">{r.dia}</td>
                <td className="px-3 py-2">{r.total}</td>
                <td className="px-3 py-2">{r.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderClienteTable = () => {
    if (isLoadingPorCliente) return <div className="text-gray-500">Cargando...</div>;
    if (isErrorPorCliente) return <div className="text-red-600">Error</div>;
    const rows = ventasPorCliente?.porCliente ?? [];
    if (rows.length === 0) return <div className="p-6 text-center text-gray-500">Sin datos</div>;
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left">Cliente</th>
              <th className="px-3 py-2 text-left">Total</th>
              <th className="px-3 py-2 text-left">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.clienteId} className="border-t">
                <td className="px-3 py-2">{r.clienteId}</td>
                <td className="px-3 py-2">{r.total}</td>
                <td className="px-3 py-2">{r.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reportes de Ventas y Compras</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Ventas entre fechas</h2>
          <div className="flex gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
              <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} className="rounded-md border border-gray-300 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
              <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} className="rounded-md border border-gray-300 px-3 py-2" />
            </div>
          </div>
          {renderTable(ventas, isErrorVentas, isLoadingVentas, "Total", "Cantidad")}
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Compras entre fechas</h2>
          {renderTable(compras, isErrorCompras, isLoadingCompras, "Total", "Cantidad")}
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Ventas por cliente</h2>
          {renderClienteTable()}
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Resumen del día</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderKpiGrid(kpisVentas, isLoadingVentasResumen, isErrorVentasResumen)}
          {renderKpiGrid(kpisCompras, isLoadingComprasResumen, isErrorComprasResumen)}
        </div>
      </div>
    </div>
  );
}
