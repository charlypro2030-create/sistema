import { useState } from "react";
import { useCreateVenta, useDeleteVenta, useUpdateVenta, useVentas } from "./hooks/useVentas";
import { VentaFormModal } from "./components/VentaFormModal";

export default function VentasPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data, isLoading, isError, error } = useVentas();
  const createM = useCreateVenta();
  const updateM = useUpdateVenta();
  const deleteM = useDeleteVenta();

  const ventas = data?.data ?? [];

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (v) => { setEditing(v); setModalOpen(true); };

  const submit = (form) => {
    if (editing) {
      updateM.mutate({ id: editing.id, data: form }, { onSuccess: () => setModalOpen(false) });
    } else {
      createM.mutate(form, { onSuccess: () => setModalOpen(false) });
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Ventas</h1>
        <button onClick={openCreate} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Nueva venta</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Código</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Fecha</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Cliente</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Vendedor</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Total</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Estado</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={7} className="px-4 py-6 text-center text-gray-500">Cargando ventas...</td></tr>}
            {isError && <tr><td colSpan={7} className="px-4 py-6 text-center text-red-600">Error: {error?.message ?? "desconocido"}</td></tr>}
            {!isLoading && !isError && ventas.map((v) => (
              <tr key={v.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{v.codigo}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{v.fecha}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{v.clientes?.nombre ?? "-"}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{v.vendedores?.nombre ?? "-"}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{v.total}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{v.estado}</td>
                <td className="px-4 py-2 text-sm border-b">
                  <div className="flex gap-3">
                    <button onClick={() => openEdit(v)} className="text-blue-600 hover:underline">Editar</button>
                    <button onClick={() => deleteM.mutate(v.id)} disabled={deleteM.isPending} className="text-red-600 hover:underline disabled:opacity-50">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <VentaFormModal open={modalOpen} onClose={() => setModalOpen(false)} venta={editing} onSubmit={submit} isPending={createM.isPending || updateM.isPending} />
    </div>
  );
}
