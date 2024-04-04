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
    const allowedOrigins = ["http://localhost:5173", "https://interfoods.netlify.app"];
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        console.log(`${method} ${originalUrl}`);
        next();
    }
});
server.use("/api/", routes_1.default);
exports.default = server;
