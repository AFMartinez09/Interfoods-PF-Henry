import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "../routes";

const server = express();
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

server.use((req, res, next) => {
  const { method, originalUrl } = req;
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Permitir acceso desde http://localhost:5173
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Permitir los métodos HTTP especificados
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Permitir los encabezados especificados
  console.log(`${method} ${originalUrl}`);
  next();
});

server.use("/api/", router);

export default server;
