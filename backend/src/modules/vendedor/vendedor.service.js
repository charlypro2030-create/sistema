import { supabase } from "../../config/supabase.js";
import { AppError } from "../../shared/AppError.js";

export const SELECT_VENDEDOR = `
  id,
  comercio_id,
  codigo,
  nombre,
  activo,
  created_at,
  updated_at
`;

const ALLOWED_FIELDS = ["comercio_id", "codigo", "nombre", "activo"];

const SORTABLE_FIELDS = ["codigo", "nombre", "created_at", "updated_at"];

function sanitize(data) {
  const clean = {};
  for (const key of ALLOWED_FIELDS) {
    if (data[key] !== undefined) clean[key] = data[key];
  }
  return clean;
}

export async function listVendedores(query = {}) {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const pageSize = Math.min(Math.max(parseInt(query.pageSize) || 10, 1), 100);
  const order = query.order === "asc" || query.order === "desc" ? query.order : "asc";
  const sort = SORTABLE_FIELDS.includes(query.sort) ? query.sort : "codigo";

  let builder = supabase.from("vendedores").select(SELECT_VENDEDOR, { count: "exact" });

  if (query.comercioId) builder = builder.eq("comercio_id", query.comercioId);
  if (query.activo !== undefined && query.activo !== null) builder = builder.eq("activo", query.activo === "true");

  const { data, count, error } = await builder.order(sort, { ascending: order === "asc" }).range((page - 1) * pageSize, (page - 1) * pageSize + pageSize - 1);

  if (error) throw new AppError(`Error consultando vendedores: ${error.message}`, 500);

  return { data: data ?? [], meta: { page, pageSize, total: count ?? 0, totalPages: Math.ceil((count ?? 0) / pageSize) } };
}

export async function getVendedorById(id) {
  const { data, error } = await supabase.from("vendedores").select(SELECT_VENDEDOR).eq("id", id).single();
  if (error) {
    if (error.code === "PGRST116") throw new AppError("Vendedor no encontrado", 404);
    throw new AppError(`Error consultando vendedor: ${error.message}`, 500);
  }
  return data;
}

export async function createVendedor(payload) {
  const data = sanitize(payload);
  if (!data.codigo || !data.nombre) throw new AppError("Codigo y nombre son obligatorios", 400);

  const { data: created, error } = await supabase.from("vendedores").insert(data).select().single();
  if (error) throw new AppError(`Error creando vendedor: ${error.message}`, 400);
  return created;
}

export async function updateVendedor(id, payload) {
  const data = sanitize(payload);
  const { data: updated, error } = await supabase.from("vendedores").update(data).eq("id", id).select().single();
  if (error) throw new AppError(`Error actualizando vendedor: ${error.message}`, 400);
  if (!updated) throw new AppError("Vendedor no encontrado", 404);
  return updated;
}

export async function deleteVendedor(id) {
  const { data: deleted, error } = await supabase.from("vendedores").delete().eq("id", id).select().single();
  if (error) throw new AppError(`Error eliminando vendedor: ${error.message}`, 400);
  if (!deleted) throw new AppError("Vendedor no encontrado", 404);
  return deleted;
}
