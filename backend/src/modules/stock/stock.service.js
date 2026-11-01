import { supabase } from "../../config/supabase.js";
import { AppError } from "../../shared/AppError.js";

export const SELECT_STOCK = `
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
  stock,
  stock_min,
  fecha_compra,
  created_at,
  updated_at,
  marcas:marcas (id, nombre),
  rubros:rubros (id, nombre),
  categorias:categorias (id, nombre),
  unidades:unidades (id, nombre, simbolos),
  proveedores:proveedores (id, nombre),
  ubicaciones:ubicaciones (id, nombre)
`;

export async function listStocks(query = {}) {
  let builder = supabase.from("articulos").select(SELECT_STOCK, { count: "exact" });

  const searchTerm = typeof query.search === "string" ? query.search.trim() : "";
  if (searchTerm) {
    const like = `%${searchTerm}%`;
    builder = builder.or(`descripcion.ilike.${like},codigo.ilike.${like}`);
  }

  if (query.activo !== undefined && query.activo !== null) {
    builder = builder.eq("activo", query.activo === "true");
  }

  const { data, count, error } = await builder.order("codigo");

  if (error) throw new AppError(`Error consultando stock: ${error.message}`, 500);

  return { data: data ?? [], meta: { total: count ?? 0 } };
}

export async function ajustarStock({ articuloId, stock }) {
  if (!articuloId) throw new AppError("articuloId es requerido", 400);
  if (stock === undefined || stock === null) throw new AppError("stock es requerido", 400);

  const { data: updated, error } = await supabase
    .from("articulos")
    .update({ stock })
    .eq("id", articuloId)
    .select()
    .single();

  if (error) throw new AppError(`Error ajustando stock: ${error.message}`, 400);
  if (!updated) throw new AppError("Articulo no encontrado", 404);

  return updated;
}
