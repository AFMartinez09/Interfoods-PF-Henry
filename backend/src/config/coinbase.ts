import { Client } from "coinbase-commerce-node";
import dotenv from "dotenv";
dotenv.config();

const apiKey = (process.env.COINBASE_API_KEY = "");
const webhookSecret = (process.env.COINBASE_WEBHOOK_SECRET = "");

export const client = Client.init(apiKey, webhookSecret);
