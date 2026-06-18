// src/config/cors.ts
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  "http://localhost:3000", // alternate local
];

export const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin (Postman, curl, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} is not allowed`));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // needed if you ever send cookies alongside Bearer tokens
};
