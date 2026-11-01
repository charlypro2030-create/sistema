import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const { supabase } = await import("./config/supabase.js");
const { errorHandler } = await import("./middlewares/errorHandler.js");
const { authenticate } = await import("./middlewares/auth.js");
const { default: apiRouter } = await import("./routes/index.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", async (req, res, next) => {
  try {
    const { error } = await supabase.from("articulos").select("id").limit(1);
    if (error) throw error;
    return res.json({ status: "ok", database: "supabase" });
  } catch (e) {
    next(e);
  }
});

app.use("/api", authenticate, apiRouter);

// 404
app.use((req, res) => {
  return res.status(404).json({ error: { message: "Ruta no encontrada" } });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`);
});
