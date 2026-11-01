import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";

export function useProveedores(filters) {
  return useQuery({
    queryKey: ["proveedores", filters],
    queryFn: async () => (await api.get("/proveedores", { params: filters })).data,
  });
}

export function useCreateProveedor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post("/proveedores", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["proveedores"] }),
  });
}

export function useUpdateProveedor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/proveedores/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["proveedores"] }),
  });
}

export function useDeleteProveedor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/proveedores/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["proveedores"] }),
  });
}
