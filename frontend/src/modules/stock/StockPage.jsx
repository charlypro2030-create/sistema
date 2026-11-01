import { useState } from "react";
import { useAjustarStock, useStocks } from "./hooks/useStock";
import { AjusteStockModal } from "./components/AjusteStockModal";

export default function StockPage() {
  const [filters, setFilters] = useState({ page: 1, pageSize: 10, sort: "codigo", order: "asc" });
  const [modalOpen, setModalOpen] = useState(false);
  const [articulo, setArticulo] = useState(null);

  const { data, isLoading, isError, error } = useStocks(filters);
  const ajustarM = useAjustarStock();

  const stocks = data?.data ?? [];
  const meta = data?.meta;

  const openAjuste = (art) => {
    setArticulo(art);
    setModalOpen(true);
  };

  const submit = ({ articuloId, stock }) => {
    ajustarM.mutate({ articuloId, stock }, { onSuccess: () => setModalOpen(false) });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Stock</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Código</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Descripción</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Stock</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Stock Mín.</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">Cargando stock...</td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-red-600">
                  Error: {error?.message ?? "desconocido"}
                </td>
              </tr>
            )}
            {!isLoading && !isError && stocks.map((art) => (
              <tr key={art.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{art.codigo}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{art.descripcion}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{art.stock}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{art.stock_min}</td>
                <td className="px-4 py-2 text-sm border-b">
                  <button
                    onClick={() => openAjuste(art)}
                    className="text-blue-600 hover:underline"
                  >
                    Ajustar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AjusteStockModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        articulo={articulo}
        onSubmit={submit}
        isPending={ajustarM.isPending}
      />
    </div>
  );
}
