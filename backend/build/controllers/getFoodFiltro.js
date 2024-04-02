"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getFoodFiltro = void 0;
const foodServices = __importStar(require("../services/foodServices"));
const getFoodFiltro = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extraer parámetros de la solicitud
        const { pais, tipo } = _req.query;
        ; // Suponiendo que los parámetros se envían en el cuerpo de la solicitud
        // Lógica de filtrado basada en los parámetros recibidos
        let finalResponse = yield foodServices.getEntriesWithoutSensitiveInfo();
        // Aplicar filtros según los parámetros recibidos
        if (pais != "Todos") {
            // Filtrar por país si el parámetro está presente
            finalResponse = finalResponse.filter((character) => character.origen === pais);
        }
        if (tipo != "Todosa") {
            // Filtrar por tipo si el parámetro está presente
            finalResponse = finalResponse.filter((character) => character.tipo === tipo);
        }
        // Devolver la respuesta filtrada
        return res.send(finalResponse);
    }
    catch (error) {
        return res.status(500).json({ error: 'Error searching for Foods.' });
    }
});
exports.getFoodFiltro = getFoodFiltro;
