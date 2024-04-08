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
exports.webhook = void 0;
const verifyPayment_1 = require("../controllers/verifyPayment");
const webhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("verificando orden de pago");
    const { dataId } = req.body;
    try {
        const response = yield (0, verifyPayment_1.verifyPayment)(dataId);
        console.log(response);
        res.status(200).json(response);
        console.log("verificación exitosa");
    }
    catch (error) {
        console.error("Error al verificar el pago:", error);
        res.status(500).send(error);
    }
});
exports.webhook = webhook;
