import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";

export function useStocks(filters) {
  return useQuery({
    queryKey: ["stock", filters],
    queryFn: async () => (await api.get("/stock", { params: filters })).data,
  });
}

export function useAjustarStock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ articuloId, stock }) => api.post("/stock/ajustes", { articuloId, stock }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock"] });
      queryClient.invalidateQueries({ queryKey: ["articulos"] });
    },
  });
}
