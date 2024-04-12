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
exports.disableReview = void 0;
const Review_1 = require("../models/Review");
const disableReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ error: "Falta el ID de la revisión" });
        }
        // Encuentra la revisión por su ID
        const review = yield Review_1.Review.findByPk(id);
        // Si no se encuentra la revisión, devuelve un error 404
        if (!review) {
            return res.status(404).send({ error: "La revisión no se encontró" });
        }
        // Cambia el estado de habilitado
        review.habilitado = !review.habilitado;
        // Guarda los cambios en la base de datos
        yield review.save();
        return res.status(200).send({ message: "El estado de la revisión se actualizó correctamente" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Error al procesar la solicitud", detalle: error });
    }
});
exports.disableReview = disableReview;
