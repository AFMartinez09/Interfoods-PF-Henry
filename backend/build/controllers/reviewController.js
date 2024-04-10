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
exports.addReviewToPlato = void 0;
const Review_1 = require("../models/Review");
const Plato_1 = require("../models/Plato");
const addReviewToPlato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { platoId } = req.params; // 
        const { comentario, calificacion } = req.body;
        const usuarioId = req.usuario.id;
        const plato = yield Plato_1.Plato.findByPk(platoId);
        if (!plato) {
            return res.status(404).send({ error: "Plato no encontrado" });
        }
        const review = yield Review_1.Review.create({
            comentario,
            calificacion,
            usuarioId,
            platoId,
        });
        return res.status(201).send(review);
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
exports.addReviewToPlato = addReviewToPlato;
