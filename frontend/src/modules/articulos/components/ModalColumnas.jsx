import { useEffect, useState } from "react";
import { X } from "react";

export function ModalColumnas({ open, onClose, columns, onApply }) {
  const [selected, setSelected] = useState(columns);

  useEffect(() => {
    if (open) {
      setSelected(columns);
    }
  }, [open, columns]);

  if (!open) return null;

  const toggle = (key) => {
    setSelected((prev) =>
      prev.map((c) => (c.key === key ? { ...c, visible: !c.visible } : c))
    );
  };

  const toggleGroup = (keys) => {
    const allVisible = keys.every((k) => selected.find((c) => c.key === k)?.visible);
    setSelected((prev) =>
      prev.map((c) => {
        if (!keys.includes(c.key)) return c;
        return { ...c, visible: !allVisible };
      })
    );
  };

  const grupos = [
    {
      label: "Datos",
      keys: ["codigo", "descripcion", "marcas.nombre", "rubros.nombre", "categorias.nombre", "proveedores.nombre", "unidades.nombre", "ubicaciones.nombre", "foto_url"],
    },
    {
      label: "Precios",
      keys: ["costo", "iva", "impuesto_interno"],
    },
  ];

  const visibleCount = selected.filter((c) => c.visible).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Columnas a mostrar</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 max-h-80 overflow-y-auto">
          {grupos.map((g) => (
            <div key={g.label}>
              <button
                onClick={() => toggleGroup(g.keys)}
                className="text-sm font-medium text-gray-700 mb-1"
              >
                {g.label}
              </button>
              <div className="grid grid-cols-2 gap-2">
                {g.keys.map((key) => {
                  const col = selected.find((c) => c.key === key);
                  return (
                    <label key={key} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={col?.visible ?? false}
                        onChange={() => toggle(key)}
                        className="rounded"
                      />
                      <span>{col?.label ?? key}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onApply(selected.filter((c) => c.visible));
              onClose();
            }}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Aplicar ({visibleCount} columnas)
          </button>
        </div>
      </div>
    </div>
  );
}
