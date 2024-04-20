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
exports.paypal = void 0;
const paypalPay_1 = require("../controllers/paypalPay");
const paypal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("creando orden de pago con PayPal");
    const { producto, precio, description } = req.body;
    try {
        const response = yield (0, paypalPay_1.paypalPay)(producto, precio, description);
        res.status(200).json(response);
        console.log("orden paypal creada con éxito");
    }
    catch (error) {
        console.error("Error al procesar el pago:", error);
        res.status(500).send(error);
    }
});
exports.paypal = paypal;
