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
exports.deleteUserDuplicates = void 0;
const Usuario_1 = require("../models/Usuario");
const deleteUserDuplicates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        // Encuentra todos los usuarios con el correo electrónico proporcionado
        const users = yield Usuario_1.Usuario.findAll({ where: { email } });
        // Verifica si hay más de un usuario con el mismo correo electrónico
        if (users.length <= 1) {
            return res.status(200).json({ message: 'No hay usuarios duplicados para eliminar' });
        }
        // Elimina todos los usuarios excepto el primero
        const usersToDelete = users.slice(1); // Obtén todos los usuarios excepto el primero
        yield Promise.all(usersToDelete.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            yield user.destroy();
        })));
        // Devuelve una respuesta exitosa
        return res.status(200).json({ message: 'Usuarios duplicados eliminados correctamente' });
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
exports.deleteUserDuplicates = deleteUserDuplicates;
