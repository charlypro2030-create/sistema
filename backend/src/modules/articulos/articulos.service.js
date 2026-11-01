import { supabase } from "../../config/supabase.js";
import { AppError } from "../../shared/AppError.js";

export const SELECT_ARTICULO = `
  id,
  comercio_id,
  codigo,
  descripcion,
  marca_id,
  rubro_id,
  categoria_id,
  unidad_id,
  proveedor_id,
  ubicacion_id,
  costo,
  iva,
  impuesto_interno,
  foto_url,
  activo,
  created_at,
  updated_at,
  marcas:marcas (id, nombre),
  rubros:rubros (id, nombre),
  categorias:categorias (id, nombre),
  unidades:unidades (id, nombre, simbolos),
  proveedores:proveedores (id, nombre),
  ubicaciones:ubicaciones (id, nombre)
`;

const SORTABLE_FIELDS = [
  "codigo",
  "descripcion",
  "costo",
  "created_at",
  "updated_at",
];

const ALLOWED_FIELDS = [
  "comercio_id",
  "codigo",
  "descripcion",
  "marca_id",
  "rubro_id",
  "categoria_id",
  "unidad_id",
  "proveedor_id",
  "ubicacion_id",
  "costo",
  "iva",
  "impuesto_interno",
  "foto_url",
  "activo",
];

export async function listArticulos(query = {}) {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const pageSize = Math.min(Math.max(parseInt(query.pageSize) || 10, 1), 100);
  const order =
    query.order === "asc" || query.order === "desc" ? query.order : "asc";
  const sort = SORTABLE_FIELDS.includes(query.sort) ? query.sort : "codigo";

  let builder = supabase
    .from("articulos")
    .select(SELECT_ARTICULO, { count: "exact" });

  const searchTerm = typeof query.search === "string" ? query.search.trim() : "";
  if (searchTerm) {
    const like = `%${searchTerm}%`;
    builder = builder.or(`descripcion.ilike.${like},codigo.ilike.${like}`);
  }

  const filters = [
    ["rubro_id", query.rubroId],
    ["marca_id", query.marcaId],
    ["categoria_id", query.categoriaId],
    ["proveedor_id", query.proveedorId],
    ["unidad_id", query.unidadId],
    ["ubicacion_id", query.ubicacionId],
  ];

  for (const [field, value] of filters) {
    if (value !== undefined && value !== null && value !== "") {
      builder = builder.eq(field, value);
    }
  }

  if (query.activo !== undefined && query.activo !== null) {
    builder = builder.eq("activo", query.activo === "true");
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await builder
    .order(sort, { ascending: order === "asc" })
    .range(from, to);

  if (error) {
    throw new AppError(`Error consultando articulos: ${error.message}`, 500);
  }

  return {
    data: data ?? [],
    meta: { page, pageSize, total: count ?? 0, totalPages: Math.ceil((count ?? 0) / pageSize) },
  };
}

export async function getArticuloById(id) {
  const { data, error } = await supabase
    .from("articulos")
    .select(SELECT_ARTICULO)
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") throw new AppError("Articulo no encontrado", 404);
    throw new AppError(`Error consultando articulo: ${error.message}`, 500);
  }

  return data;
}

export async function createArticulo(payload) {
  const data = {};
  for (const key of ALLOWED_FIELDS) {
    if (payload[key] !== undefined) data[key] = payload[key];
  }

  const { data: created, error } = await supabase
    .from("articulos")
    .insert(data)
    .select()
    .single();

  if (error) throw new AppError(`Error creando articulo: ${error.message}`, 400);
  return created;
}

export async function updateArticulo(id, payload) {
  const data = {};
  for (const key of ALLOWED_FIELDS) {
    if (payload[key] !== undefined) data[key] = payload[key];
  }

  const { data: updated, error } = await supabase
    .from("articulos")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new AppError(`Error actualizando articulo: ${error.message}`, 400);
  if (!updated) throw new AppError("Articulo no encontrado", 404);

  const { data: full, error: fullError } = await supabase
    .from("articulos")
    .select(SELECT_ARTICULO)
    .eq("id", id)
    .single();

  if (fullError) throw new AppError(`Error consultando articulo: ${fullError.message}`, 500);
  return full;
}

export async function deleteArticulo(id) {
  const { data: updated, error } = await supabase
    .from("articulos")
    .update({ activo: false })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new AppError(`Error eliminando articulo: ${error.message}`, 400);
  if (!updated) throw new AppError("Articulo no encontrado", 404);

  return updated;
}
