import { supabase } from "../../config/supabase.js";
import { AppError } from "../../shared/AppError.js";

function sumTotals(rows) {
  return (rows ?? []).reduce((acc, r) => acc + (Number(r.total) || 0), 0);
}

export async function getResumenVentasDelDia() {
  const dia = new Date().toISOString().slice(0, 10);

  const { data, error, count } = await supabase
    .from("ventas")
    .select("id, total", { count: "exact" })
    .eq("fecha", dia);

  if (error) throw new AppError(`Error generando resumen de ventas: ${error.message}`, 500);

  return {
    dia,
    totalVentas: sumTotals(data),
    cantidadVentas: count ?? 0,
  };
}

export async function getVentasEntreFechas({ desde, hasta }) {
  let builder = supabase.from("ventas").select("id, total, fecha");

  if (desde) builder = builder.gte("fecha", desde);
  if (hasta) builder = builder.lte("fecha", hasta);

  const { data, error } = await builder.order("fecha", { ascending: true });

  if (error) throw new AppError(`Error generando ventas entre fechas: ${error.message}`, 500);

  const totalVentas = sumTotals(data);
  const cantidadVentas = data?.length ?? 0;

  const porDia = {};
  for (const v of data ?? []) {
    const key = v.fecha;
    if (!porDia[key]) porDia[key] = { dia: key, total: 0, cantidad: 0 };
    porDia[key].total += Number(v.total) || 0;
    porDia[key].cantidad += 1;
  }

  return {
    desde: desde ?? null,
    hasta: hasta ?? null,
    totalVentas,
    cantidadVentas,
    porDia: Object.values(porDia),
  };
}

export async function getResumenComprasDelDia() {
  const dia = new Date().toISOString().slice(0, 10);

  const { data, error, count } = await supabase
    .from("compras")
    .select("id, total", { count: "exact" })
    .eq("fecha", dia);

  if (error) throw new AppError(`Error generando resumen de compras: ${error.message}`, 500);

  return {
    dia,
    totalCompras: sumTotals(data),
    cantidadCompras: count ?? 0,
  };
}

export async function getComprasEntreFechas({ desde, hasta }) {
  let builder = supabase.from("compras").select("id, total, fecha");

  if (desde) builder = builder.gte("fecha", desde);
  if (hasta) builder = builder.lte("fecha", hasta);

  const { data, error } = await builder.order("fecha", { ascending: true });

  if (error) throw new AppError(`Error generando compras entre fechas: ${error.message}`, 500);

  const totalCompras = sumTotals(data);
  const cantidadCompras = data?.length ?? 0;

  const porDia = {};
  for (const c of data ?? []) {
    const key = c.fecha;
    if (!porDia[key]) porDia[key] = { dia: key, total: 0, cantidad: 0 };
    porDia[key].total += Number(c.total) || 0;
    porDia[key].cantidad += 1;
  }

  return {
    desde: desde ?? null,
    hasta: hasta ?? null,
    totalCompras,
    cantidadCompras,
    porDia: Object.values(porDia),
  };
}

export async function getVentasPorClienteEntreFechas({ desde, hasta }) {
  let builder = supabase.from("ventas").select("id, total, cliente_id, fecha");

  if (desde) builder = builder.gte("fecha", desde);
  if (hasta) builder = builder.lte("fecha", hasta);

  const { data, error } = await builder;

  if (error) throw new AppError(`Error generando ventas por cliente: ${error.message}`, 500);

  const porCliente = {};
  for (const v of data ?? []) {
    const key = v.cliente_id ?? "sin_cliente";
    if (!porCliente[key]) porCliente[key] = { clienteId: key, total: 0, cantidad: 0 };
    porCliente[key].total += Number(v.total) || 0;
    porCliente[key].cantidad += 1;
  }

  return {
    desde: desde ?? null,
    hasta: hasta ?? null,
    porCliente: Object.values(porCliente),
    total: sumTotals(data),
    cantidad: data?.length ?? 0,
  };
}
