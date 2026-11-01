import { useState } from "react";
import { useCreateCajaMovimiento, useDeleteCajaMovimiento, useUpdateCajaMovimiento, useCajaMovimientos } from "./hooks/useCaja";
import { CajaMovimientoFormModal } from "./components/CajaMovimientoFormModal";

export default function CajaPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data, isLoading, isError, error } = useCajaMovimientos();
  const createM = useCreateCajaMovimiento();
  const updateM = useUpdateCajaMovimiento();
  const deleteM = useDeleteCajaMovimiento();

  const movimientos = data?.data ?? [];

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (m) => { setEditing(m); setModalOpen(true); };

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
        <h1 className="text-2xl font-bold text-gray-800">Caja</h1>
        <button onClick={openCreate} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Nuevo movimiento</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Tipo</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Descripción</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Importe</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Fecha</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-500">Cargando movimientos de caja...</td></tr>}
            {isError && <tr><td colSpan={5} className="px-4 py-6 text-center text-red-600">Error: {error?.message ?? "desconocido"}</td></tr>}
            {!isLoading && !isError && movimientos.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{m.tipo}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{m.descripcion}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{m.importe}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{m.fecha}</td>
                <td className="px-4 py-2 text-sm border-b">
                  <div className="flex gap-3">
                    <button onClick={() => openEdit(m)} className="text-blue-600 hover:underline">Editar</button>
                    <button onClick={() => deleteM.mutate(m.id)} disabled={deleteM.isPending} className="text-red-600 hover:underline disabled:opacity-50">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CajaMovimientoFormModal open={modalOpen} onClose={() => setModalOpen(false)} movimiento={editing} onSubmit={submit} isPending={createM.isPending || updateM.isPending} />
    </div>
  );
}
