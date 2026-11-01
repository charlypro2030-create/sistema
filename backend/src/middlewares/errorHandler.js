export const errorHandler = (err, req, res, next) => {
  console.error("[ERROR]", {
    message: err.message,
    stack: err.stack,
    path: req.path,
  });

  const status = err.status || 500;
  const message =
    status === 500 ? "Error interno del servidor" : err.message;

  return res.status(status).json({
    error: {
      message,
      ...(process.env.NODE_ENV !== "production" && err.stack
        ? { stack: err.stack }
        : {}),
    },
  });
};
