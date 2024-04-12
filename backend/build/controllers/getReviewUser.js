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
exports.getReviewForUser = void 0;
const Review_1 = require("../models/Review");
const getReviewForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuarioId } = req.params;
        if (!usuarioId) {
            return res.status(400).send({ error: "Falta el ID del plato" });
        }
        const reviews = yield Review_1.Review.findAll({ where: { usuarioId } });
        return res.status(200).send(reviews);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Error al procesar la solicitud", detalle: error });
    }
});
exports.getReviewForUser = getReviewForUser;
