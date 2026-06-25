import express from "express";
import cors from "cors";
import { corsOptions } from "./cors.js";
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./users/users.route.js";
const server = express();
server.use(express.json());
server.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;
export const myPool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

server.use("/user", userRouter);

myPool.on("connect", () => {
  console.log("Connection ya DB iko inadiiiii!!!!");
});
myPool.on("error", (err) => {
  console.log("DB Connection Error: ", err.message);
});
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    const res = await myPool.query("SELECT NOW()");
    console.log("DATABASE HANDSHAKE SUCCESSFUL!");
    console.log("DB Time:", res.rows[0].now);
    console.log("Connection ya DB is CONNECTED!");
  } catch (err: any) {
    console.error("DATABASE HANDSHAKE FAILED!");
    console.error("Error Message:", err.message);
    if (err.code === "ECONNREFUSED") {
      console.error(
        "Check if PostgreSQL is running and DB_PORT is 5432 in .env",
      );
    }
  }
});
