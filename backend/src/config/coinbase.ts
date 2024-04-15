import { Client, resources } from "coinbase-commerce-node";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.COINBASE_API_KEY;

if (!apiKey) {
  throw new Error("COINBASE_API_KEY is not set in the .env file");
}

export const client = Client.init(apiKey);
export const compra = resources.Charge;
