import { useEffect, useState } from "react";

export function ClienteFormModal({ open, onClose, cliente, onSubmit, isPending }) {
  const [form, setForm] = useState({ codigo: "", nombre: "", tipo: "cliente", rubroId: "", vendedorId: "", zonaId: "", telefono: "", email: "" });

  useEffect(() => {
    if (open) {
      setForm(
        cliente
          ? {
              codigo: cliente.codigo ?? "",
              nombre: cliente.nombre ?? "",
              tipo: cliente.tipo ?? "cliente",
              rubroId: cliente.rubro_id ?? "",
              vendedorId: cliente.vendedor_id ?? "",
              zonaId: cliente.zona_id ?? "",
              telefono: cliente.telefono ?? "",
              email: cliente.email ?? "",
            }
          : { codigo: "", nombre: "", tipo: "cliente", rubroId: "", vendedorId: "", zonaId: "", telefono: "", email: "" }
      );
    }
  }, [open, cliente]);

  if (!open) return null;

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      rubroId: form.rubroId || null,
      vendedorId: form.vendedorId || null,
      zonaId: form.zonaId || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{cliente ? "Editar cliente" : "Nuevo cliente"}</h2>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
            <input required value={form.codigo} onChange={(e) => set("codigo", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input required value={form.nombre} onChange={(e) => set("nombre", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select value={form.tipo} onChange={(e) => set("tipo", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="cliente">Cliente</option>
              <option value="proveedor">Proveedor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input value={form.telefono} onChange={(e) => set("telefono", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" />
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
