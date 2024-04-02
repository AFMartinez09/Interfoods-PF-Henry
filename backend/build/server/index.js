"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("../routes"));
const server = (0, express_1.default)();
server.use((0, morgan_1.default)("dev"));
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use((req, res, next) => {
    const { method, originalUrl } = req;
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Permitir acceso desde http://localhost:5173
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Permitir los métodos HTTP especificados
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Permitir los encabezados especificados
    console.log(`${method} ${originalUrl}`);
    next();
});
server.use("/api/", routes_1.default);
exports.default = server;
