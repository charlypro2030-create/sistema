import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";

export function useClientes(filters) {
  return useQuery({
    queryKey: ["clientes", filters],
    queryFn: async () => (await api.get("/clientes", { params: filters })).data,
  });
}

export function useCreateCliente() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post("/clientes", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clientes"] }),
  });
}

export function useUpdateCliente() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/clientes/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clientes"] }),
  });
}

export function useDeleteCliente() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/clientes/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clientes"] }),
  });
}
