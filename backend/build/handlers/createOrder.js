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
exports.createOrder = void 0;
const pay_1 = require("../controllers/pay");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("creando orden de pago");
    const { idCompra, producto, precio, idUsuario, emailUser, nombreUser } = req.body;
    try {
        const response = yield (0, pay_1.pay)(idCompra, producto, precio, idUsuario, emailUser, nombreUser);
        res.status(201).json(response);
        console.log("orden creada con éxito");
    }
    catch (error) {
        console.error("Error al procesar el pago:", error);
        res.status(500).send(error);
    }
});
exports.createOrder = createOrder;
