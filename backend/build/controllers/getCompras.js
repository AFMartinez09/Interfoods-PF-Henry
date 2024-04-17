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
exports.getAllCompras = void 0;
const Compra_1 = require("../models/Compra");
const getAllCompras = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const compras = yield Compra_1.Compra.findAll();
        return res.status(200).json({ compras });
    }
    catch (error) {
        console.error('Error al obtener las compras:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAllCompras = getAllCompras;
