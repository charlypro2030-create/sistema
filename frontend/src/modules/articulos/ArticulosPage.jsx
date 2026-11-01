import { useState } from "react";
import { useArticulos } from "./hooks/useArticulos";
import { ModalColumnas } from "./components/ModalColumnas";
import { PlanillaArticulos } from "./components/PlanillaArticulos";

export const COLUMNAS_DISPONIBLES = [
  { key: "codigo", label: "Código", visible: true },
  { key: "descripcion", label: "Descripción", visible: true },
  { key: "marcas.nombre", label: "Marca", visible: true },
  { key: "rubros.nombre", label: "Rubro", visible: true },
  { key: "categorias.nombre", label: "Categoría", visible: true },
  { key: "proveedores.nombre", label: "Proveedor", visible: true },
  { key: "unidades.nombre", label: "Unidad", visible: true },
  { key: "ubicaciones.nombre", label: "Ubicación", visible: true },
  { key: "costo", label: "Costo", visible: true },
  { key: "iva", label: "IVA", visible: true },
  { key: "impuesto_interno", label: "Impuesto interno", visible: true },
];

export default function ArticulosPage() {
  const [filters, setFilters] = useState({ page: 1, pageSize: 10, sort: "codigo", order: "asc" });
  const [modalOpen, setModalOpen] = useState(false);
  const [columns, setColumns] = useState(COLUMNAS_DISPONIBLES);

  const { data, isLoading, isError, error } = useArticulos(filters);
  const articulos = data?.data ?? [];
  const meta = data?.meta;

  const visibleColumns = columns.filter((c) => c.visible);

  const toggleColumn = (key) => {
    setColumns((prev) =>
      prev.map((c) => (c.key === key ? { ...c, visible: !c.visible } : c))
    );
  };

  const toggleGroup = (keys) => {
    const allVisible = keys.every((k) => columns.find((c) => c.key === k)?.visible);
    setColumns((prev) =>
      prev.map((c) => {
        if (!keys.includes(c.key)) return c;
        return { ...c, visible: !allVisible };
      })
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Artículos</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Configurar columnas
        </button>
      </div>

      <PlanillaArticulos
        articulos={articulos}
        columns={visibleColumns}
        meta={meta}
        isLoading={isLoading}
        isError={isError}
        error={error}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <ModalColumnas open={modalOpen} onClose={() => setModalOpen(false)} columns={columns} onApply={setColumns} />
    </div>
  );
}
