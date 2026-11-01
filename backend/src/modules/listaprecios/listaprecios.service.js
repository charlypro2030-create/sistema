import { supabase } from "../../config/supabase.js";
import { AppError } from "../../shared/AppError.js";

export const SELECT_LISTA = `
  id,
  comercio_id,
  codigo,
  nombre,
  es_editable,
  porcentaje_ganancia,
  iva,
  en_dolares,
  activo,
  created_at,
  updated_at
`;

const ALLOWED_FIELDS = [
  "comercio_id",
  "codigo",
  "nombre",
  "es_editable",
  "porcentaje_ganancia",
  "iva",
  "en_dolares",
  "activo",
];

function sanitize(data) {
  const clean = {};
  for (const key of ALLOWED_FIELDS) {
    if (data[key] !== undefined) clean[key] = data[key];
  }
  return clean;
}

function round2(value) {
  return Math.round((value ?? 0) * 100) / 100;
}

export function calcularPrecio({ costo, porcentajeGanancia, iva }) {
  const base = (costo ?? 0) * (1 + (porcentajeGanancia ?? 0) / 100);
  const precio = iva ? base * (1 + iva / 100) : base;
  return round2(precio);
}

export async function listListas(query = {}) {
  let builder = supabase.from("listas_precios").select(SELECT_LISTA, { count: "exact" });

  if (query.comercioId) builder = builder.eq("comercio_id", query.comercioId);
  if (query.esEditable !== undefined && query.esEditable !== null) {
    builder = builder.eq("es_editable", query.esEditable === "true");
  }

  const { data, count, error } = await builder.order("codigo");

  if (error) throw new AppError(`Error consultando listas de precios: ${error.message}`, 500);

  return { data: data ?? [], meta: { total: count ?? 0 } };
}

export async function getListaById(id) {
  const { data, error } = await supabase
    .from("listas_precios")
    .select(SELECT_LISTA)
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") throw new AppError("Lista de precios no encontrada", 404);
    throw new AppError(`Error consultando lista de precios: ${error.message}`, 500);
  }

  return data;
}

export async function createLista(payload) {
  const data = sanitize(payload);
  if (!data.codigo || !data.nombre) {
    throw new AppError("Codigo y nombre son obligatorios", 400);
  }

  const { data: created, error } = await supabase.from("listas_precios").insert(data).select().single();
  if (error) throw new AppError(`Error creando lista de precios: ${error.message}`, 400);
  return created;
}

export async function updateLista(id, payload) {
  const data = sanitize(payload);
  const { data: updated, error } = await supabase
    .from("listas_precios")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new AppError(`Error actualizando lista de precios: ${error.message}`, 400);
  if (!updated) throw new AppError("Lista de precios no encontrada", 404);
  return updated;
}

export async function deleteLista(id) {
  const { data: deleted, error } = await supabase
    .from("listas_precios")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw new AppError(`Error eliminando lista de precios: ${error.message}`, 400);
  if (!deleted) throw new AppError("Lista de precios no encontrada", 404);
  return deleted;
}

export async function recalcularPrecios(listaId) {
  const lista = await getListaById(listaId);

  const { data: articulos, error: articulosError } = await supabase
    .from("articulos")
    .select("id, costo, rubro_id, marca_id")
    .eq("activo", true);

  if (articulosError) throw new AppError(`Error consultando articulos: ${articulosError.message}`, 500);

  const resultados = (articulos.data ?? []).map((art) => ({
    articuloId: art.id,
    precio: calcularPrecio({
      costo: art.costo,
      porcentajeGanancia: lista.porcentaje_ganancia,
      iva: lista.iva,
    }),
  }));

  return { listaId, resultados };
}
