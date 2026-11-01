import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";

export function useVentas(filters) {
  return useQuery({
    queryKey: ["ventas", filters],
    queryFn: async () => (await api.get("/ventas", { params: filters })).data,
  });
}

export function useCreateVenta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post("/ventas", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ventas"] }),
  });
}

export function useUpdateVenta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/ventas/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ventas"] }),
  });
}

export function useDeleteVenta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/ventas/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ventas"] }),
  });
}
