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
exports.createOrderPaypal = void 0;
const paypalPay_1 = require("../controllers/paypalPay");
const createOrderPaypal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product, price, description } = req.body;
        console.log("Creando Orden de pago Paypal");
        const response = yield (0, paypalPay_1.createOrder)(product, price, description);
        res.status(200).json(response);
        console.log("Orden de pago Paypal creada con éxito");
    }
    catch (error) {
        console.error("Error al crear la orden con Paypal:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
});
exports.createOrderPaypal = createOrderPaypal;
