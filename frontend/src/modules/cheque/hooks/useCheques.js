import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";

export function useCheques(filters) {
  return useQuery({
    queryKey: ["cheques", filters],
    queryFn: async () => (await api.get("/cheques", { params: filters })).data,
  });
}

export function useCreateCheque() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post("/cheques", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cheques"] }),
  });
}

export function useUpdateCheque() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/cheques/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cheques"] }),
  });
}

export function useDeleteCheque() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/cheques/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cheques"] }),
  });
}
