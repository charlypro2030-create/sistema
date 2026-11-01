import { supabase } from "../../config/supabase.js";
import { AppError } from "../../shared/AppError.js";

export const SELECT_CLIENTE = `
  id,
  comercio_id,
  codigo,
  nombre,
  tipo,
  rubro_id,
  vendedor_id,
  zona_id,
  telefono,
  email,
  activo,
  created_at,
  updated_at,
  vendedores:vendedores (id, nombre),
  zonas:zonas (id, nombre)
`;

const ALLOWED_FIELDS = [
  "comercio_id",
  "codigo",
  "nombre",
  "tipo",
  "rubro_id",
  "vendedor_id",
  "zona_id",
  "telefono",
  "email",
  "activo",
];

const SORTABLE_FIELDS = ["codigo", "nombre", "created_at", "updated_at"];

function sanitize(data) {
  const clean = {};
  for (const key of ALLOWED_FIELDS) {
    if (data[key] !== undefined) clean[key] = data[key];
  }
  return clean;
}

export async function listClientes(query = {}) {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const pageSize = Math.min(Math.max(parseInt(query.pageSize) || 10, 1), 100);
  const order = query.order === "asc" || query.order === "desc" ? query.order : "asc";
  const sort = SORTABLE_FIELDS.includes(query.sort) ? query.sort : "codigo";

  let builder = supabase.from("clientes").select(SELECT_CLIENTE, { count: "exact" });

  const searchTerm = typeof query.search === "string" ? query.search.trim() : "";
  if (searchTerm) {
    const like = `%${searchTerm}%`;
    builder = builder.or(`nombre.ilike.${like},codigo.ilike.${like}`);
  }

  if (query.tipo) builder = builder.eq("tipo", query.tipo);
  if (query.vendedorId) builder = builder.eq("vendedor_id", query.vendedorId);
  if (query.zonaId) builder = builder.eq("zona_id", query.zonaId);
  if (query.activo !== undefined && query.activo !== null) {
    builder = builder.eq("activo", query.activo === "true");
  }

  const { data, count, error } = await builder
    .order(sort, { ascending: order === "asc" })
    .range((page - 1) * pageSize, (page - 1) * pageSize + pageSize - 1);

  if (error) throw new AppError(`Error consultando clientes: ${error.message}`, 500);

  return {
    data: data ?? [],
    meta: { page, pageSize, total: count ?? 0, totalPages: Math.ceil((count ?? 0) / pageSize) },
  };
}

export async function getClienteById(id) {
  const { data, error } = await supabase.from("clientes").select(SELECT_CLIENTE).eq("id", id).single();
  if (error) {
    if (error.code === "PGRST116") throw new AppError("Cliente no encontrado", 404);
    throw new AppError(`Error consultando cliente: ${error.message}`, 500);
  }
  return data;
}

export async function createCliente(payload) {
  const data = sanitize(payload);
  if (!data.nombre) throw new AppError("El nombre es obligatorio", 400);

  const { data: created, error } = await supabase.from("clientes").insert(data).select().single();
  if (error) throw new AppError(`Error creando cliente: ${error.message}`, 400);
  return created;
}

export async function updateCliente(id, payload) {
  const data = sanitize(payload);
  const { data: updated, error } = await supabase.from("clientes").update(data).eq("id", id).select().single();
  if (error) throw new AppError(`Error actualizando cliente: ${error.message}`, 400);
  if (!updated) throw new AppError("Cliente no encontrado", 404);
  return updated;
}

export async function deleteCliente(id) {
  const { data: deleted, error } = await supabase.from("clientes").delete().eq("id", id).select().single();
  if (error) throw new AppError(`Error eliminando cliente: ${error.message}`, 400);
  if (!deleted) throw new AppError("Cliente no encontrado", 404);
  return deleted;
}
