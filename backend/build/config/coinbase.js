"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compra = exports.client = void 0;
const coinbase_commerce_node_1 = require("coinbase-commerce-node");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const apiKey = process.env.COINBASE_API_KEY;
if (!apiKey) {
    throw new Error("COINBASE_API_KEY is not set in the .env file");
}
exports.client = coinbase_commerce_node_1.Client.init(apiKey);
exports.compra = coinbase_commerce_node_1.resources.Charge;
