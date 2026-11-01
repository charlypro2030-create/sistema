import { useEffect, useState } from "react";

export function ListaFormModal({ open, onClose, lista, onSubmit, isPending }) {
  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    esEditable: true,
    porcentajeGanancia: 0,
    iva: 0,
    enDolares: false,
  });

  useEffect(() => {
    if (open) {
      setForm(
        lista
          ? {
              codigo: lista.codigo ?? "",
              nombre: lista.nombre ?? "",
              esEditable: !!lista.es_editable,
              porcentajeGanancia: lista.porcentaje_ganancia ?? 0,
              iva: lista.iva ?? 0,
              enDolares: !!lista.en_dolares,
            }
          : {
              codigo: "",
              nombre: "",
              esEditable: true,
              porcentajeGanancia: 0,
              iva: 0,
              enDolares: false,
            }
      );
    }
  }, [open, lista]);

  if (!open) return null;

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {lista ? "Editar lista de precios" : "Nueva lista de precios"}
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
            <input
              required
              value={form.codigo}
              onChange={(e) => set("codigo", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              required
              value={form.nombre}
              onChange={(e) => set("nombre", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={form.esEditable}
              onChange={(e) => set("esEditable", e.target.checked)}
              className="rounded"
            />
            <span>Lista editable</span>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">% Ganancia</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.porcentajeGanancia}
                onChange={(e) => set("porcentajeGanancia", Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IVA (%)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.iva}
                onChange={(e) => set("iva", Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={form.enDolares}
              onChange={(e) => set("enDolares", e.target.checked)}
              className="rounded"
            />
            <span>En dólares</span>
          </label>

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
