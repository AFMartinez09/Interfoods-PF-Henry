"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagos = exports.preference = void 0;
const mercadopago_1 = require("mercadopago");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessToken = process.env.TOKEN_MERCADO_PAGO || "";
const client = new mercadopago_1.MercadoPagoConfig({
    accessToken: accessToken,
});
exports.preference = new mercadopago_1.Preference(client);
exports.pagos = new mercadopago_1.Payment(client);
