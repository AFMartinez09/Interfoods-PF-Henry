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
exports.pay = void 0;
const mercadoPago_1 = require("../config/mercadoPago");
const pay = (idCompra, producto, precio, idUsuario, emailUser, nombreUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield mercadoPago_1.preference.create({
            body: {
                items: [
                    {
                        id: idCompra,
                        title: producto,
                        unit_price: precio,
                        quantity: 1,
                        currency_id: "ARS",
                    },
                ],
                metadata: {
                    idUsuario: idUsuario,
                    emailUser: emailUser,
                    nombreUser: nombreUser,
                },
                back_urls: {
                    success: "https://interfoods.netlify.app/api/payments/success", //ruta de deploy
                    // success: "http://localhost:3000/api/payments/success", //ruta local
                    // success: "http://localhost:5173/api/payments/success", //ruta local
                    failure: "",
                    pending: "",
                },
                auto_return: "approved",
                binary_mode: true,
                notification_url: "https://interfoods.netlify.app",
                // "https://fc40-93-40-64-152.ngrok-free.app/api/payments/webhook", //Aca debemos agregar la ruta en la cual se ha hecho el deploy
            },
        });
        console.log("URL: " + response.init_point);
        return response.init_point;
    }
    catch (error) {
        console.log(error);
        throw new Error(`Error al procesar el pago con ${idCompra}`);
    }
});
exports.pay = pay;
