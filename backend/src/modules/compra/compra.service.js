import { supabase } from "../../config/supabase.js";
import { AppError } from "../../shared/AppError.js";

export const SELECT_COMPRA = `
  id,
  comercio_id,
  codigo,
  fecha,
  proveedor_id,
  total,
  estado,
  created_at,
  updated_at,
  proveedores:proveedores (id, nombre)
`;

const ALLOWED_FIELDS = ["comercio_id", "codigo", "fecha", "proveedor_id", "total", "estado"];

const SORTABLE_FIELDS = ["codigo", "fecha", "created_at", "updated_at"];

function sanitize(data) {
  const clean = {};
  for (const key of ALLOWED_FIELDS) {
    if (data[key] !== undefined) clean[key] = data[key];
  }
  return clean;
}

export async function listCompras(query = {}) {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const pageSize = Math.min(Math.max(parseInt(query.pageSize) || 10, 1), 100);
  const order = query.order === "asc" || query.order === "desc" ? query.order : "asc";
  const sort = SORTABLE_FIELDS.includes(query.sort) ? query.sort : "fecha";

  let builder = supabase.from("compras").select(SELECT_COMPRA, { count: "exact" });

  if (query.comercioId) builder = builder.eq("comercio_id", query.comercioId);
  if (query.proveedorId) builder = builder.eq("proveedor_id", query.proveedorId);
  if (query.estado) builder = builder.eq("estado", query.estado);
  if (query.desde) builder = builder.gte("fecha", query.desde);
  if (query.hasta) builder = builder.lte("fecha", query.hasta);

  const { data, count, error } = await builder.order(sort, { ascending: order === "asc" }).range((page - 1) * pageSize, (page - 1) * pageSize + pageSize - 1);

  if (error) throw new AppError(`Error consultando compras: ${error.message}`, 500);

  return { data: data ?? [], meta: { page, pageSize, total: count ?? 0, totalPages: Math.ceil((count ?? 0) / pageSize) } };
}

export async function getCompraById(id) {
  const { data, error } = await supabase.from("compras").select(SELECT_COMPRA).eq("id", id).single();
  if (error) {
    if (error.code === "PGRST116") throw new AppError("Compra no encontrada", 404);
    throw new AppError(`Error consultando compra: ${error.message}`, 500);
  }
  return data;
}

export async function createCompra(payload) {
  const data = sanitize(payload);
  if (!data.codigo || !data.fecha) throw new AppError("Codigo y fecha son obligatorios", 400);

  const { data: created, error } = await supabase.from("compras").insert(data).select().single();
  if (error) throw new AppError(`Error creando compra: ${error.message}`, 400);
  return created;
}

export async function updateCompra(id, payload) {
  const data = sanitize(payload);
  const { data: updated, error } = await supabase.from("compras").update(data).eq("id", id).select().single();
  if (error) throw new AppError(`Error actualizando compra: ${error.message}`, 400);
  if (!updated) throw new AppError("Compra no encontrada", 404);
  return updated;
}

export async function deleteCompra(id) {
  const { data: deleted, error } = await supabase.from("compras").delete().eq("id", id).select().single();
  if (error) throw new AppError(`Error eliminando compra: ${error.message}`, 400);
  if (!deleted) throw new AppError("Compra no encontrada", 404);
  return deleted;
}
