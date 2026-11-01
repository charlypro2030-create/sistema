import { useState } from "react";
import { useCreateCheque, useDeleteCheque, useUpdateCheque, useCheques } from "./hooks/useCheques";
import { ChequeFormModal } from "./components/ChequeFormModal";

export default function ChequesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data, isLoading, isError, error } = useCheques();
  const createM = useCreateCheque();
  const updateM = useUpdateCheque();
  const deleteM = useDeleteCheque();

  const cheques = data?.data ?? [];

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (c) => { setEditing(c); setModalOpen(true); };

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
        <h1 className="text-2xl font-bold text-gray-800">Cheques</h1>
        <button onClick={openCreate} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Nuevo cheque</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Código</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Fecha</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Cliente</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Banco</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Importe</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Estado</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={7} className="px-4 py-6 text-center text-gray-500">Cargando cheques...</td></tr>}
            {isError && <tr><td colSpan={7} className="px-4 py-6 text-center text-red-600">Error: {error?.message ?? "desconocido"}</td></tr>}
            {!isLoading && !isError && cheques.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{c.codigo}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{c.fecha}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{c.clientes?.nombre ?? "-"}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{c.banco ?? "-"}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{c.importe}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{c.estado}</td>
                <td className="px-4 py-2 text-sm border-b">
                  <div className="flex gap-3">
                    <button onClick={() => openEdit(c)} className="text-blue-600 hover:underline">Editar</button>
                    <button onClick={() => deleteM.mutate(c.id)} disabled={deleteM.isPending} className="text-red-600 hover:underline disabled:opacity-50">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ChequeFormModal open={modalOpen} onClose={() => setModalOpen(false)} cheque={editing} onSubmit={submit} isPending={createM.isPending || updateM.isPending} />
    </div>
  );
}
