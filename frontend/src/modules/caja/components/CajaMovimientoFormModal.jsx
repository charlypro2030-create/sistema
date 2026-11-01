import { useEffect, useState } from "react";

export function CajaMovimientoFormModal({ open, onClose, movimiento, onSubmit, isPending }) {
  const [form, setForm] = useState({ tipo: "ingreso", descripcion: "", importe: 0, fecha: "" });

  useEffect(() => {
    if (open) {
      setForm(
        movimiento
          ? { tipo: movimiento.tipo ?? "ingreso", descripcion: movimiento.descripcion ?? "", importe: movimiento.importe ?? 0, fecha: movimiento.fecha ?? "" }
          : { tipo: "ingreso", descripcion: "", importe: 0, fecha: "" }
      );
    }
  }, [open, movimiento]);

  if (!open) return null;

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, importe: Number(form.importe) || 0 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{movimiento ? "Editar movimiento" : "Nuevo movimiento"}</h2>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select value={form.tipo} onChange={(e) => set("tipo", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="ingreso">Ingreso</option>
              <option value="gasto">Gasto</option>
              <option value="retiro">Retiro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <input required value={form.descripcion} onChange={(e) => set("descripcion", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Importe</label>
            <input type="number" step="0.01" min="0" value={form.importe} onChange={(e) => set("importe", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
            <input required type="date" value={form.fecha} onChange={(e) => set("fecha", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">Cancelar</button>
            <button type="submit" disabled={isPending} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
              {isPending ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
