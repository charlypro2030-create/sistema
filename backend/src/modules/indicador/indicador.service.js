import { supabase } from "../../config/supabase.js";
import { AppError } from "../../shared/AppError.js";

function sumTotals(rows) {
  return (rows ?? []).reduce((acc, r) => acc + (Number(r.total) || 0), 0);
}

export async function getIndicadores() {
  const hoy = new Date().toISOString().slice(0, 10);
  const inicioMes = `${hoy.slice(0, 8)}01`;

  const [{ data: ventasHoy, error: e1 }, { data: ventasMes, error: e2 }, { data: articulos, error: e3 }] = await Promise.all([
    supabase.from("ventas").select("id, total").eq("fecha", hoy),
    supabase.from("ventas").select("id, total").gte("fecha", inicioMes),
    supabase.from("articulos").select("id, stock, activo"),
  ]);

  if (e1) throw new AppError(`Error calculando indicadores: ${e1.message}`, 500);
  if (e2) throw new AppError(`Error calculando indicadores: ${e2.message}`, 500);
  if (e3) throw new AppError(`Error calculando indicadores: ${e3.message}`, 500);

  return {
    ventasHoy: sumTotals(ventasHoy),
    ventasMes: sumTotals(ventasMes),
    cantidadVentasHoy: ventasHoy?.length ?? 0,
    articulosActivos: (articulos ?? []).filter((a) => a.activo).length,
    stockTotal: (articulos ?? []).filter((a) => a.activo).reduce((acc, a) => acc + (Number(a.stock) || 0), 0),
  };
}
