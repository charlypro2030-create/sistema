import { useEffect, useState } from "react";

export function AjusteStockModal({ open, onClose, articulo, onSubmit, isPending }) {
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (open) {
      setStock(articulo?.stock ?? 0);
    }
  }, [open, articulo]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ articuloId: articulo.id, stock });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ajuste de stock</h2>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <p className="text-sm text-gray-700 mb-1">
              Artículo: <span className="font-medium">{articulo?.codigo}</span> — {articulo?.descripcion}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nuevo stock</label>
            <input
              required
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
