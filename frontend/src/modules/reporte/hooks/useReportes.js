import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

export function useResumenVentasDelDia() {
  return useQuery({
    queryKey: ["reportes", "ventas", "resumen-del-dia"],
    queryFn: async () => (await api.get("/reportes/ventas/resumen-del-dia")).data,
  });
}

export function useVentasEntreFechas(filters) {
  return useQuery({
    queryKey: ["reportes", "ventas", "entre-fechas", filters],
    queryFn: async () => (await api.get("/reportes/ventas/entre-fechas", { params: filters })).data,
    enabled: Boolean(filters?.desde || filters?.hasta),
  });
}

export function useResumenComprasDelDia() {
  return useQuery({
    queryKey: ["reportes", "compras", "resumen-del-dia"],
    queryFn: async () => (await api.get("/reportes/compras/resumen-del-dia")).data,
  });
}

export function useComprasEntreFechas(filters) {
  return useQuery({
    queryKey: ["reportes", "compras", "entre-fechas", filters],
    queryFn: async () => (await api.get("/reportes/compras/entre-fechas", { params: filters })).data,
    enabled: Boolean(filters?.desde || filters?.hasta),
  });
}

export function useVentasPorClienteEntreFechas(filters) {
  return useQuery({
    queryKey: ["reportes", "ventas", "por-cliente", filters],
    queryFn: async () => (await api.get("/reportes/clientes/entre-fechas", { params: filters })).data,
    enabled: Boolean(filters?.desde || filters?.hasta),
  });
}
