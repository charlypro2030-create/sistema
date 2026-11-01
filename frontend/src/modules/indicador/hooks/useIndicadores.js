import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

export function useIndicadores() {
  return useQuery({
    queryKey: ["indicadores"],
    queryFn: async () => (await api.get("/indicadores")).data,
  });
}
