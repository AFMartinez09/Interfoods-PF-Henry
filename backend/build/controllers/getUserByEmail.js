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
exports.findUserByEmail = void 0;
const Usuario_1 = require("../models/Usuario");
// Controlador para buscar un usuario por su correo electrónico
const findUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params; // Suponiendo que el correo electrónico se pasa como parámetro en la URL
    try {
        // Buscar el usuario en la base de datos por su correo electrónico
        const user = yield Usuario_1.Usuario.findOne({ where: { email } });
        if (user) {
            // Si se encuentra el usuario, devolverlo en la respuesta
            return res.status(200).json({ user });
        }
        else {
            // Si no se encuentra el usuario, devolver un mensaje de error
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        // Manejar cualquier error que ocurra durante la búsqueda del usuario
        console.error('Error al buscar el usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.findUserByEmail = findUserByEmail;
