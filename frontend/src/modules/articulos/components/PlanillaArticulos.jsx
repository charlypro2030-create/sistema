import { getValue } from "../../../utils/getValue";

export function PlanillaArticulos({
  articulos,
  columns,
  meta,
  isLoading,
  isError,
  error,
  filters,
  onFiltersChange,
}) {
  if (isLoading) {
    return <div className="p-6 text-gray-500">Cargando artículos...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Error al cargar artículos: {error?.message ?? "desconocido"}
      </div>
    );
  }

  const rows = articulos ?? [];

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                  {c.label}
                </th>
              ))}
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-2 text-sm text-gray-800 border-b">
                    {String(getValue(row, c.key) ?? "")}
                  </td>
                ))}
                <td className="px-4 py-2 text-sm border-b">
                  <button className="text-blue-600 hover:underline">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <div className="p-6 text-center text-gray-500">No hay artículos para mostrar.</div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div>
          Página {filters.page} de {meta?.totalPages ?? 1} · Total: {meta?.total ?? 0}
        </div>
        <div className="flex gap-2">
          <button
            disabled={filters.page <= 1}
            onClick={() => onFiltersChange({ ...filters, page: filters.page - 1 })}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            disabled={filters.page >= (meta?.totalPages ?? 1)}
            onClick={() => onFiltersChange({ ...filters, page: filters.page + 1 })}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
