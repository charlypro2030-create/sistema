import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";

export function useListasPrecios(filters) {
  return useQuery({
    queryKey: ["listas-precios", filters],
    queryFn: async () => (await api.get("/listas-precios", { params: filters })).data,
  });
}

export function useCreateLista() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post("/listas-precios", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["listas-precios"] }),
  });
}

export function useUpdateLista() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/listas-precios/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["listas-precios"] }),
  });
}

export function useDeleteLista() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/listas-precios/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["listas-precios"] }),
  });
}

export function useRecalcularPrecios() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (listaId) => api.post(`/listas-precios/${listaId}/recalcular`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["listas-precios"] }),
  });
}
