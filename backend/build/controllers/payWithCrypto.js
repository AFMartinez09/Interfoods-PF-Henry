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
const coinbase_1 = require("../config/coinbase");
const payWithCrypto = (nombre, descripcion, precio, emailUser, nombreUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chargeData = {
            name: nombre,
            description: descripcion,
            pricing_type: "fixed_price",
            local_price: {
                amount: precio,
                currency: "USD",
            },
            metadata: {
                customer_name: nombreUser,
                customer_email: emailUser,
            },
            redirect_url: "http://localhost:3000/api/payments/redirect",
        };
        const response = yield coinbase_1.compra.create(chargeData);
        console.log("Orden creada con éxito:", response);
        return response; // Devuelve el objeto de carga creado
    }
    catch (error) {
        console.error("Error al crear la orden:", error);
        throw new Error(`Error al procesar el pago`);
    }
});
exports.payWithCrypto = payWithCrypto;
