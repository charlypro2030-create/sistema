import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";

export function useCompras(filters) {
  return useQuery({
    queryKey: ["compras", filters],
    queryFn: async () => (await api.get("/compras", { params: filters })).data,
  });
}

export function useCreateCompra() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post("/compras", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["compras"] }),
  });
}

export function useUpdateCompra() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/compras/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["compras"] }),
  });
}

export function useDeleteCompra() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/compras/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["compras"] }),
  });
}
