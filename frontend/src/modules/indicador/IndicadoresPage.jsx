import { useIndicadores } from "./hooks/useIndicadores";

export default function IndicadoresPage() {
  const { data, isLoading, isError } = useIndicadores();

  const kpis = [
    { label: "Ventas Hoy", value: data?.ventasHoy },
    { label: "Ventas del Mes", value: data?.ventasMes },
    { label: "Cantidad Ventas Hoy", value: data?.cantidadVentasHoy },
    { label: "Artículos Activos", value: data?.articulosActivos },
    { label: "Stock Total", value: data?.stockTotal },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Indicadores del Negocio</h1>

      {isLoading && <div className="p-4 bg-white rounded-lg text-gray-500">Cargando indicadores...</div>}
      {isError && <div className="p-4 bg-white rounded-lg text-red-600">Error: {data?.error ?? "desconocido"}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="p-4 bg-white rounded-lg border">
            <div className="text-sm text-gray-500">{k.label}</div>
            <div className="text-2xl font-bold text-gray-800">{k.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
