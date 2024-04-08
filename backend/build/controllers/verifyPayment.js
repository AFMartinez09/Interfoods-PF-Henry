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
exports.verifyPayment = void 0;
const mercadoPago_1 = require("../config/mercadoPago");
const verifyPayment = (dataId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Estados de los pagos");
    try {
        if ((dataId === null || dataId === void 0 ? void 0 : dataId.type) === "payment") {
            const response = yield mercadoPago_1.pagos.capture(dataId.id);
            console.log(`El estado del pago es ${response.status}`);
            return response.status;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al registrar el pago");
    }
});
exports.verifyPayment = verifyPayment;
