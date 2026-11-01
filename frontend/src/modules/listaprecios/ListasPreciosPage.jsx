import { useState } from "react";
import { useCreateLista, useDeleteLista, useListasPrecios, useRecalcularPrecios, useUpdateLista } from "./hooks/useListasPrecios";
import { ListaFormModal } from "./components/ListaFormModal";

export default function ListasPreciosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data, isLoading, isError, error, refetch } = useListasPrecios();
  const createM = useCreateLista();
  const updateM = useUpdateLista();
  const deleteM = useDeleteLista();
  const recalcularM = useRecalcularPrecios();

  const listas = data?.data ?? [];

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (lista) => {
    setEditing(lista);
    setModalOpen(true);
  };

  const submit = (form) => {
    if (editing) {
      updateM.mutate(
        { id: editing.id, data: { ...form, esEditable: form.esEditable, enDolares: form.enDolares } },
        { onSuccess: () => setModalOpen(false) }
      );
    } else {
      createM.mutate(
        { ...form, esEditable: form.esEditable, enDolares: form.enDolares },
        { onSuccess: () => setModalOpen(false) }
      );
    }
  };

  const tipo = (lista) => (lista.es_editable ? "Editable" : "Calculada");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Listas de Precios</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Nueva lista
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Código</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Nombre</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Tipo</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">% Ganancia</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">IVA</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">En dólares</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">Cargando listas de precios...</td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-red-600">
                  Error: {error?.message ?? "desconocido"}
                </td>
              </tr>
            )}
            {!isLoading && !isError && listas.map((lista) => (
              <tr key={lista.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{lista.codigo}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{lista.nombre}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${lista.es_editable ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                    {tipo(lista)}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{lista.porcentaje_ganancia}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{lista.iva}</td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">{lista.en_dolares ? "Sí" : "No"}</td>
                <td className="px-4 py-2 text-sm border-b">
                  <div className="flex gap-3">
                    <button
                      onClick={() => recalcularM.mutate(lista.id)}
                      disabled={recalcularM.isPending}
                      className="text-blue-600 hover:underline disabled:opacity-50"
                    >
                      Recalcular
                    </button>
                    <button onClick={() => openEdit(lista)} className="text-blue-600 hover:underline">Editar</button>
                    <button
                      onClick={() => deleteM.mutate(lista.id)}
                      disabled={deleteM.isPending}
                      className="text-red-600 hover:underline disabled:opacity-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ListaFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        lista={editing}
        onSubmit={submit}
        isPending={createM.isPending || updateM.isPending}
      />
    </div>
  );
}
