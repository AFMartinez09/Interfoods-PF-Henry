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
exports.updateUser = void 0;
const Usuario_1 = require("../models/Usuario");
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const updateData = req.body;
        // Lógica para actualizar el usuario
        const user = yield Usuario_1.Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        // Actualiza las propiedades del usuario con los datos proporcionados en el cuerpo de la solicitud
        yield user.update(updateData);
        // Devuelve el usuario actualizado como respuesta
        return res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        else {
            // Manejo de errores no esperados
            return res.status(500).json({ error: 'Un error desconocido ocurrió' });
        }
    }
});
exports.updateUser = updateUser;
