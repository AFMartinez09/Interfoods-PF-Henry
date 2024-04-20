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
exports.captureOrderPaypal = void 0;
const paypalPay_1 = require("../controllers/paypalPay");
const captureOrderPaypal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderID } = req.params;
        const response = yield (0, paypalPay_1.captureOrder)(orderID);
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error al capturar la orden de pago de paypal:", error);
        res
            .status(500)
            .json({ error: "Error al capturar la orden de pago de paypal." });
    }
});
exports.captureOrderPaypal = captureOrderPaypal;
