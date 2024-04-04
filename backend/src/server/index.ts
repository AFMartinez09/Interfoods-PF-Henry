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
  res.header("Access-Control-Allow-Origin", "https://main--interfoods.netlify.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  console.log(`${method} ${originalUrl}`);
  next();
});

server.use("/api/", router);

export default server;
