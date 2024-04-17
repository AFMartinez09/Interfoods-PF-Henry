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
exports.cambiarinventario = exports.activar = exports.deleteFood = exports.updateFood = exports.addFood = exports.getEntriesWithoutSensitiveInfo = exports.findById = exports.getEntries = void 0;
const Plato_1 = require("../Plato"); // Asegúrate de que la ruta al modelo Plato sea correcta
const getEntries = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Plato_1.Plato.findAll();
});
exports.getEntries = getEntries;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Plato_1.Plato.findByPk(id, {
        attributes: { exclude: ["campoSensible1", "campoSensible2"] }, // Excluye los campos sensibles si los hay
    });
});
exports.findById = findById;
const getEntriesWithoutSensitiveInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Plato_1.Plato.findAll({
        attributes: [
            "id",
            "nombre",
            "origen",
            "ingredientes",
            "kilocalorias",
            "carbohidratos",
            "grasas",
            "peso",
            "precio",
            "tipo",
            "imagen",
            "descripcion",
            "stock",
            "activo",
            "inventario",
        ],
    });
});
exports.getEntriesWithoutSensitiveInfo = getEntriesWithoutSensitiveInfo;
const addFood = (newFoodEntry) => __awaiter(void 0, void 0, void 0, function* () {
    const newPlato = yield Plato_1.Plato.create(newFoodEntry);
    return newPlato;
});
exports.addFood = addFood;
const updateFood = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const plato = yield Plato_1.Plato.findByPk(id);
    if (!plato) {
        throw new Error("Plato no encontrado");
    }
    return yield plato.update(updateData);
});
exports.updateFood = updateFood;
const deleteFood = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const plato = yield Plato_1.Plato.findByPk(id);
    if (!plato) {
        throw new Error("Plato no encontrado");
    }
    yield plato.update({ activo: false });
    return { message: "Plato desactivado exitosamente" };
});
exports.deleteFood = deleteFood;
const activar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const plato = yield Plato_1.Plato.findByPk(id);
    if (!plato) {
        throw new Error("Plato no encontrado");
    }
    yield plato.update({ activo: true });
    return { message: "Plato activado exitosamente" };
});
exports.activar = activar;
const cambiarinventario = (id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const plato = yield Plato_1.Plato.findByPk(id);
    if (!plato) {
        throw new Error("Plato no encontradoaaaaaaaaaaaaaaaa");
    }
    let inventario = plato.inventario;
    let final = inventario - quantity;
    yield plato.update({ inventario: final });
    return { message: "Inventario actualizado" };
});
exports.cambiarinventario = cambiarinventario;
