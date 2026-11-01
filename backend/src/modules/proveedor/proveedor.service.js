import { supabase } from "../../config/supabase.js";
import { AppError } from "../../shared/AppError.js";

export const SELECT_PROVEEDOR = `
  id,
  comercio_id,
  codigo,
  nombre,
  contacto,
  telefono,
  email,
  activo,
  created_at,
  updated_at
`;

const ALLOWED_FIELDS = ["comercio_id", "codigo", "nombre", "contacto", "telefono", "email", "activo"];

const SORTABLE_FIELDS = ["codigo", "nombre", "created_at", "updated_at"];

function sanitize(data) {
  const clean = {};
  for (const key of ALLOWED_FIELDS) {
    if (data[key] !== undefined) clean[key] = data[key];
  }
  return clean;
}

export async function listProveedores(query = {}) {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const pageSize = Math.min(Math.max(parseInt(query.pageSize) || 10, 1), 100);
  const order = query.order === "asc" || query.order === "desc" ? query.order : "asc";
  const sort = SORTABLE_FIELDS.includes(query.sort) ? query.sort : "codigo";

  let builder = supabase.from("proveedores").select(SELECT_PROVEEDOR, { count: "exact" });

  const searchTerm = typeof query.search === "string" ? query.search.trim() : "";
  if (searchTerm) {
    const like = `%${searchTerm}%`;
    builder = builder.or(`nombre.ilike.${like},codigo.ilike.${like}`);
  }

  if (query.activo !== undefined && query.activo !== null) {
    builder = builder.eq("activo", query.activo === "true");
  }

  const { data, count, error } = await builder.order(sort, { ascending: order === "asc" }).range((page - 1) * pageSize, (page - 1) * pageSize + pageSize - 1);

  if (error) throw new AppError(`Error consultando proveedores: ${error.message}`, 500);

  return { data: data ?? [], meta: { page, pageSize, total: count ?? 0, totalPages: Math.ceil((count ?? 0) / pageSize) } };
}

export async function getProveedorById(id) {
  const { data, error } = await supabase.from("proveedores").select(SELECT_PROVEEDOR).eq("id", id).single();
  if (error) {
    if (error.code === "PGRST116") throw new AppError("Proveedor no encontrado", 404);
    throw new AppError(`Error consultando proveedor: ${error.message}`, 500);
  }
  return data;
}

export async function createProveedor(payload) {
  const data = sanitize(payload);
  if (!data.nombre) throw new AppError("El nombre es obligatorio", 400);

  const { data: created, error } = await supabase.from("proveedores").insert(data).select().single();
  if (error) throw new AppError(`Error creando proveedor: ${error.message}`, 400);
  return created;
}

export async function updateProveedor(id, payload) {
  const data = sanitize(payload);
  const { data: updated, error } = await supabase.from("proveedores").update(data).eq("id", id).select().single();
  if (error) throw new AppError(`Error actualizando proveedor: ${error.message}`, 400);
  if (!updated) throw new AppError("Proveedor no encontrado", 404);
  return updated;
}

export async function deleteProveedor(id) {
  const { data: deleted, error } = await supabase.from("proveedores").delete().eq("id", id).select().single();
  if (error) throw new AppError(`Error eliminando proveedor: ${error.message}`, 400);
  if (!deleted) throw new AppError("Proveedor no encontrado", 404);
  return deleted;
}
