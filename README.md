# Sistema de Gestion Comercial — Plus Web clone

Sistema de gestion comercial (articulos, clientes, compras, ventas, cheques, caja, etc.) construido con:

- **Frontend:** React 18 + Vite + Tailwind CSS + React Query + React Router + Zustand + Axios
- **Backend:** Node.js 20 + Express (ESM) + Supabase (PostgreSQL, Auth, Storage, RLS)
- **Base de datos:** Supabase
- **Hosting:** Render

## Estructura

```
backend/src/
  index.js
  config/        -> supabase client
  middlewares/   -> auth (JWT), errorHandler
  modules/       -> articulos, listaprecios, stock, cliente, compra, venta, cheque, proveedor, caja
  routes/        -> router general
  shared/        -> AppError

frontend/src/
  modules/       -> articulos, listaprecios, stock, cliente, compra, venta, cheque, proveedor, caja
  services/      -> api client (axios)
  store/         -> estado global (Zustand)
  routes -> App -> Layout con NavLink
supabase/migrations/ -> SQL inicial
```

## Local

### Backend

1. Copiar `backend/.env.example` -> `backend/.env` y completar:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_JWT_SECRET`
2. `cd backend && npm install`
3. `npm run dev`

### Frontend

1. `cd frontend && npm install`
2. `npm run dev`

## Deploy en Render

- Repo conectado a Render.
- Service backend: root `backend`, build `cd backend && npm install`, start `cd backend && npm run start`.
- Service frontend estatico: root `frontend`, build `cd frontend && npm install && npm run build`, publish `./frontend/dist`.
- Variables de entorno en backend: `SUPABASE_*`, `PORT`.

## Migraciones Supabase

- `supabase/migrations/001_initial_schema.sql` -> aplicar en SQL editor de Supabase o via CLI.
