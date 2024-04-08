"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagos = exports.preference = void 0;
const mercadopago_1 = require("mercadopago");
const accessToken = process.env.TOKEN_MERCADO_PAGO || "";
const client = new mercadopago_1.MercadoPagoConfig({
    accessToken: accessToken,
});
exports.preference = new mercadopago_1.Preference(client);
exports.pagos = new mercadopago_1.Payment(client);
