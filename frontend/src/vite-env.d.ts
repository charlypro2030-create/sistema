/// <reference types="vite/client" />

export interface ApiError {
  error: {
    message: string;
    stack?: string;
  };
}
