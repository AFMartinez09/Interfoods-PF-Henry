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
exports.deleteReviewById = void 0;
const Review_1 = require("../models/Review");
const deleteReviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Buscar la review por su ID
        const reviewToDelete = yield Review_1.Review.findByPk(id);
        // Verificar si la review existe
        if (!reviewToDelete) {
            return res.status(404).json({ message: 'La review no existe' });
        }
        // Eliminar la review
        yield reviewToDelete.destroy();
        return res.status(200).json({ message: 'Review eliminada correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar la review:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteReviewById = deleteReviewById;
