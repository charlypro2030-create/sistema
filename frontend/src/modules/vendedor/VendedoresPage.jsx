import { useState } from "react";
import { useCreateVendedor, useDeleteVendedor, useUpdateVendedor, useVendedores } from "./hooks/useVendedores";
import { VendedorFormModal } from "./components/VendedorFormModal";

export default function VendedoresPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data, isLoading, isError, error } = useVendedores();
  const createM = useCreateVendedor();
  const updateM = useUpdateVendedor();
  const deleteM = useDeleteVendedor();

  const vendedores = data?.data ?? [];

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
        <h1 className="text-2xl font-bold text-gray-800">Vendedores</h1>
        <button onClick={openCreate} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Nuevo vendedor</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Código</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Nombre</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={3} className="px-4 py-6 text-center text-gray-500">Cargando vendedores...</td></tr>}
            {isError && <tr><td colSpan={3} className="px-4 py-6 text-center text-red-600">Error: {error?.message ?? "desconocido"}</td></tr>}
            {!isLoading && !isError && vendedores.map((v) => (
              <tr key={v.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{v.codigo}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{v.nombre}</td>
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

      <VendedorFormModal open={modalOpen} onClose={() => setModalOpen(false)} vendedor={editing} onSubmit={submit} isPending={createM.isPending || updateM.isPending} />
    </div>
  );
}
