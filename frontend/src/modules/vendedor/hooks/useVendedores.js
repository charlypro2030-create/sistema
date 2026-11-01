import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";

export function useVendedores(filters) {
  return useQuery({
    queryKey: ["vendedores", filters],
    queryFn: async () => (await api.get("/vendedores", { params: filters })).data,
  });
}

export function useCreateVendedor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post("/vendedores", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vendedores"] }),
  });
}

export function useUpdateVendedor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/vendedores/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vendedores"] }),
  });
}

export function useDeleteVendedor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/vendedores/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vendedores"] }),
  });
}
