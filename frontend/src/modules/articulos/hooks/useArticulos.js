import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

export function useArticulos(filters) {
  return useQuery({
    queryKey: ["articulos", filters],
    queryFn: async () => {
      const { data } = await api.get("/articulos", { params: filters });
      return data;
    },
    placeholderData: (prev) => prev,
  });
}
