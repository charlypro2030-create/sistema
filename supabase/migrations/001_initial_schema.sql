-- ============================================================
-- Esquema inicial Supabase — Sistema de Gestion Comercial
-- ============================================================

create extension if not exists "pgcrypto";

-- Tabla de comercio (tenant)
create table if not exists public.comercios (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Marcas
create table if not exists public.marcas (
  id uuid primary key default gen_random_uuid(),
  comercio_id uuid not null references public.comercios (id) on delete cascade,
  nombre text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Rubros (arbol)
create table if not exists public.rubros (
  id uuid primary key default gen_random_uuid(),
  comercio_id uuid not null references public.comercios (id) on delete cascade,
  nombre text not null,
  padre_id uuid references public.rubros (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Categorias
create table if not exists public.categorias (
  id uuid primary key default gen_random_uuid(),
  comercio_id uuid not null references public.comercios (id) on delete cascade,
  rubro_id uuid references public.rubros (id) on delete set null,
  nombre text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Unidades
create table if not exists public.unidades (
  id uuid primary key default gen_random_uuid(),
  comercio_id uuid not null references public.comercios (id) on delete cascade,
  nombre text not null,
  simbolos text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ubicaciones
create table if not exists public.ubicaciones (
  id uuid primary key default gen_random_uuid(),
  comercio_id uuid not null references public.comercios (id) on delete cascade,
  nombre text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Proveedores
create table if not exists public.proveedores (
  id uuid primary key default gen_random_uuid(),
  comercio_id uuid not null references public.comercios (id) on delete cascade,
  codigo text not null,
  nombre text not null,
  contacto text,
  telefono text,
  email text,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (comercio_id, codigo)
);

-- Vendedores
create table if not exists public.vendedores (
  id uuid primary key default gen_random_uuid(),
  comercio_id uuid not null references public.comercios (id) on delete cascade,
  codigo text not null,
  nombre text not null,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (comercio_id, codigo)
);

-- Clientes
create table if not exists public.clientes (
  id uuid primary key default gen_random_uuid(),
  comercio_id uuid not null references public.comercios (id) on delete cascade,
  codigo text not null,
  nombre text not null,
  tipo text not null default 'cliente',
  rubro_id uuid references public.rubros (id) on delete set null,
  vendedor_id uuid references public.vendedores (id) on delete set null,
  zona_id uuid references public.ubicaciones (id) on delete set null,
  telefono text,
  email text,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (comercio_id, codigo)
);

-- Articulos
create table if not exists public.articulos (
  id uuid primary key default gen_random_uuid(),
  comercio_id uuid not null references public.comercios (id) on delete cascade,
  codigo text not null,
  descripcion text,
  marca_id uuid references public.marcas (id) on delete set null,
  rubro_id uuid references public.rubros (id) on delete set null,
  categoria_id uuid references public.categorias (id) on delete set null,
  unidad_id uuid references public.unidades (id) on delete set null,
  proveedor_id uuid references public.proveedores (id) on delete set null,
  ubicacion_id uuid references public.ubicaciones (id) on delete set null,
  costo numeric(12,2) not null default 0,
  iva numeric(5,2) not null default 0,
  impuesto_interno numeric(5,2) not null default 0,
  foto_url text,
  activo boolean not null default true,
  stock numeric(14,2) not null default 0,
  stock_min numeric(14,2) not null default 0,
  fecha_compra date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (comercio_id, codigo)
);

-- Listas de Precios
create table if not exists public.listas_precios (
  id uuid primary key default gen_random_uuid(),
  comercio_id uuid not null references public.comercios (id) on delete cascade,
  codigo text not null,
  nombre text not null,
  es_editable boolean not null default false,
  porcentaje_ganancia numeric(5,2) not null default 0,
  iva numeric(5,2) not null default 0,
  en_dolares boolean not null default false,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Articulos por lista de precios (precio calculado/override)
create table if not exists public.articulos_listas (
  id uuid primary key default gen_random_uuid(),
  articulo_id uuid not null references public.articulos (id) on delete cascade,
  lista_id uuid not null references public.listas_precios (id) on delete cascade,
  precio numeric(12,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (articulo_id, lista_id)
);

-- Compras
create table if not exists public.compras (
  id uuid primary key default gen_random_uuid(),
  comercio_id uuid not null references public.comercios (id) on delete cascade,
  codigo text not null,
  fecha date not null,
  proveedor_id uuid references public.proveedores (id) on delete set null,
  total numeric(14,2) not null default 0,
  estado text not null default 'registrado',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (comercio_id, codigo)
);

-- Ventas
create table if not exists public.ventas (
  id uuid primary key default gen_random_uuid(),
  comercio_id uuid not null references public.comercios (id) on delete cascade,
  codigo text not null,
  fecha date not null,
  cliente_id uuid references public.clientes (id) on delete set null,
  vendedor_id uuid references public.vendedores (id) on delete set null,
  total numeric(14,2) not null default 0,
  estado text not null default 'registrado',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (comercio_id, codigo)
);

-- Cheques
create table if not exists public.cheques (
  id uuid primary key default gen_random_uuid(),
  comercio_id uuid not null references public.comercios (id) on delete cascade,
  codigo text not null,
  fecha date not null,
  cliente_id uuid references public.clientes (id) on delete set null,
  vendedor_id uuid references public.vendedores (id) on delete set null,
  banco text,
  importe numeric(14,2) not null default 0,
  estado text not null default 'registrado',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (comercio_id, codigo)
);

-- Caja (movimientos)
create table if not exists public.caja_movimientos (
  id uuid primary key default gen_random_uuid(),
  comercio_id uuid not null references public.comercios (id) on delete cascade,
  tipo text not null,
  descripcion text not null,
  importe numeric(14,2) not null default 0,
  fecha date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- Indices
-- ============================================================
create index if not exists idx_articulos_comercio_codigo on public.articulos (comercio_id, codigo);
create index if not exists idx_articulos_rubro on public.articulos (comercio_id, rubro_id);
create index if not exists idx_articulos_marca on public.articulos (comercio_id, marca_id);
create index if not exists idx_ventas_comercio_fecha on public.ventas (comercio_id, fecha);
create index if not exists idx_compras_comercio_fecha on public.compras (comercio_id, fecha);
create index if not exists idx_cheques_comercio_fecha on public.cheques (comercio_id, fecha);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.comercios enable row level security;
alter table public.marcas enable row level security;
alter table public.rubros enable row level security;
alter table public.categorias enable row level security;
alter table public.unidades enable row level security;
alter table public.ubicaciones enable row level security;
alter table public.proveedores enable row level security;
alter table public.vendedores enable row level security;
alter table public.clientes enable row level security;
alter table public.articulos enable row level security;
alter table public.listas_precios enable row level security;
alter table public.articulos_listas enable row level security;
alter table public.compras enable row level security;
alter table public.ventas enable row level security;
alter table public.cheques enable row level security;
alter table public.caja_movimientos enable row level security;

-- Nota: las politicas RLS se completan en una migracion posterior
-- con el modelo de acceso por comercio_id + rol authenticated.
