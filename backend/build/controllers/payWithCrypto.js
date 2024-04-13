"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payWithCrypto = void 0;
const coinbase_commerce_node_1 = require("coinbase-commerce-node");
const payWithCrypto = (nombre, descripcion, emailUser, nombreUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chargeDate = yield coinbase_commerce_node_1.resources.Charge.create({
            name: nombre,
            description: descripcion,
            pricing_type: "no_price",
            metadata: {
                customer_name: nombreUser,
                email: emailUser,
            },
            redirect_url: "http://localhost:3000/api/payments/redirect",
        });
        console.log("Orden creada con éxito :", chargeDate);
        return chargeDate;
    }
    catch (error) {
        console.error("Error al crear la orden:", error);
        throw new Error(`Error al procesar el pago`);
    }
});
exports.payWithCrypto = payWithCrypto;
