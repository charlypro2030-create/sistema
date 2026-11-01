import { useEffect, useState } from "react";

export function ChequeFormModal({ open, onClose, cheque, onSubmit, isPending }) {
  const [form, setForm] = useState({ codigo: "", fecha: "", clienteId: "", vendedorId: "", banco: "", importe: 0, estado: "registrado" });

  useEffect(() => {
    if (open) {
      setForm(
        cheque
          ? {
              codigo: cheque.codigo ?? "",
              fecha: cheque.fecha ?? "",
              clienteId: cheque.cliente_id ?? "",
              vendedorId: cheque.vendedor_id ?? "",
              banco: cheque.banco ?? "",
              importe: cheque.importe ?? 0,
              estado: cheque.estado ?? "registrado",
            }
          : { codigo: "", fecha: "", clienteId: "", vendedorId: "", banco: "", importe: 0, estado: "registrado" }
      );
    }
  }, [open, cheque]);

  if (!open) return null;

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      clienteId: form.clienteId || null,
      vendedorId: form.vendedorId || null,
      importe: Number(form.importe) || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{cheque ? "Editar cheque" : "Nuevo cheque"}</h2>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
            <input required value={form.codigo} onChange={(e) => set("codigo", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
            <input required type="date" value={form.fecha} onChange={(e) => set("fecha", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <input required value={form.clienteId} onChange={(e) => set("clienteId", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="UUID del cliente" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Banco</label>
            <input value={form.banco} onChange={(e) => set("banco", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Importe</label>
            <input type="number" step="0.01" min="0" value={form.importe} onChange={(e) => set("importe", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select value={form.estado} onChange={(e) => set("estado", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="registrado">Registrado</option>
              <option value="anulado">Anulado</option>
            </select>
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
