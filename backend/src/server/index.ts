import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import router from "../routes";

const server = express();
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

server.use((req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl } = req;
  const allowedOrigins = ["http://localhost:5173", "https://interfoods.netlify.app"];
  const origin = req.headers.origin as string | undefined; 
  
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    console.log(`${method} ${originalUrl}`);
    next();
  }
});

server.use("/api/", router);

export default server;
