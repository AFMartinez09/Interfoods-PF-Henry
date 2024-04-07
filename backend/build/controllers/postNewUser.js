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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNewUser = void 0;
const firebaseAdmin_1 = require("../auth/firebaseAdmin");
const node_fetch_1 = __importDefault(require("node-fetch"));
const registerNewUser = (email, password, nombre, apellido, foto, pais, ciudad, direccion, admin, habilitado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRecord = yield firebaseAdmin_1.auth.createUser({
            email,
            password,
        });
        const json = JSON.stringify({
            email,
            nombre,
            apellido,
            foto,
            pais,
            ciudad,
            direccion,
            admin,
            habilitado,
        });
        const response = yield (0, node_fetch_1.default)('http://127.0.0.1:3000/api/register/signupDb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: json,
        });
        if (!response.ok) {
            throw new Error('Error al registrar el usuario en la base de datos');
        }
        return userRecord;
    }
    catch (error) {
        throw new Error('Error al registrar el usuario');
    }
});
exports.registerNewUser = registerNewUser;
