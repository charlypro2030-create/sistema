import { supabase } from "../../config/supabase.js";
import { AppError } from "../../shared/AppError.js";

export const SELECT_FACTURA = `
  id,
  comercio_id,
  codigo,
  fecha,
  cliente_id,
  vendedor_id,
  total,
  estado,
  created_at,
  updated_at,
  clientes:clientes (id, nombre),
  vendedores:vendedores (id, nombre)
`;

const ALLOWED_FIELDS = ["comercio_id", "codigo", "fecha", "cliente_id", "vendedor_id", "total", "estado"];

const SORTABLE_FIELDS = ["codigo", "fecha", "created_at", "updated_at"];

function sanitize(data) {
  const clean = {};
  for (const key of ALLOWED_FIELDS) {
    if (data[key] !== undefined) clean[key] = data[key];
  }
  return clean;
}

export async function listVentas(query = {}) {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const pageSize = Math.min(Math.max(parseInt(query.pageSize) || 10, 1), 100);
  const order = query.order === "asc" || query.order === "desc" ? query.order : "asc";
  const sort = SORTABLE_FIELDS.includes(query.sort) ? query.sort : "fecha";

  let builder = supabase.from("ventas").select(SELECT_FACTURA, { count: "exact" });

  if (query.comercioId) builder = builder.eq("comercio_id", query.comercioId);
  if (query.clienteId) builder = builder.eq("cliente_id", query.clienteId);
  if (query.vendedorId) builder = builder.eq("vendedor_id", query.vendedorId);
  if (query.estado) builder = builder.eq("estado", query.estado);
  if (query.desde) builder = builder.gte("fecha", query.desde);
  if (query.hasta) builder = builder.lte("fecha", query.hasta);

  const { data, count, error } = await builder.order(sort, { ascending: order === "asc" }).range((page - 1) * pageSize, (page - 1) * pageSize + pageSize - 1);

  if (error) throw new AppError(`Error consultando ventas: ${error.message}`, 500);

  return { data: data ?? [], meta: { page, pageSize, total: count ?? 0, totalPages: Math.ceil((count ?? 0) / pageSize) } };
}

export async function getVentaById(id) {
  const { data, error } = await supabase.from("ventas").select(SELECT_FACTURA).eq("id", id).single();
  if (error) {
    if (error.code === "PGRST116") throw new AppError("Venta no encontrada", 404);
    throw new AppError(`Error consultando venta: ${error.message}`, 500);
  }
  return data;
}

export async function createVenta(payload) {
  const data = sanitize(payload);
  if (!data.codigo || !data.fecha) throw new AppError("Codigo y fecha son obligatorios", 400);

  const { data: created, error } = await supabase.from("ventas").insert(data).select().single();
  if (error) throw new AppError(`Error creando venta: ${error.message}`, 400);
  return created;
}

export async function updateVenta(id, payload) {
  const data = sanitize(payload);
  const { data: updated, error } = await supabase.from("ventas").update(data).eq("id", id).select().single();
  if (error) throw new AppError(`Error actualizando venta: ${error.message}`, 400);
  if (!updated) throw new AppError("Venta no encontrada", 404);
  return updated;
}

export async function deleteVenta(id) {
  const { data: deleted, error } = await supabase.from("ventas").delete().eq("id", id).select().single();
  if (error) throw new AppError(`Error eliminando venta: ${error.message}`, 400);
  if (!deleted) throw new AppError("Venta no encontrada", 404);
  return deleted;
}
