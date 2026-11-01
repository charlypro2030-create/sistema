import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";

export function useCajaMovimientos(filters) {
  return useQuery({
    queryKey: ["caja", filters],
    queryFn: async () => (await api.get("/caja", { params: filters })).data,
  });
}

export function useCreateCajaMovimiento() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post("/caja", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["caja"] }),
  });
}

export function useUpdateCajaMovimiento() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/caja/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["caja"] }),
  });
}

export function useDeleteCajaMovimiento() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/caja/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["caja"] }),
  });
}
