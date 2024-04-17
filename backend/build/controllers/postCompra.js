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
exports.createCompra = void 0;
const Compra_1 = require("../models/Compra");
const createCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { totalProductos, totalGasto, usuarioId, detallesPlatos } = req.body;
        // Verifica si todos los campos necesarios están presentes en el cuerpo de la solicitud
        if (!totalProductos || !totalGasto || !usuarioId || !detallesPlatos) {
            return res.status(400).json({ error: "Missing required fields in the request body." });
        }
        // Crea una nueva compra en la base de datos
        const newCompra = yield Compra_1.Compra.create({
            totalProductos,
            totalGasto,
            usuarioId,
            detallesPlatos
        });
        // Devuelve la nueva compra creada en la respuesta
        return res.status(201).json(newCompra);
    }
    catch (error) {
        console.error("Error creating new purchase:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
exports.createCompra = createCompra;
