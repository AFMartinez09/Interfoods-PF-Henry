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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const sequelize_1 = __importDefault(require("./sequelize")); // Ajusta la ruta según la estructura de tu proyecto
const Plato_1 = require("./Plato"); // Ajusta la ruta según la estructura de tu proyecto
// Función para cargar los platos desde un archivo JSON
function cargarPlatosDesdeJSON() {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, 'services', 'food.json'); // Asegúrate de que la ruta sea correcta
        const rawData = yield fs_1.promises.readFile(filePath, 'utf8');
        const platos = JSON.parse(rawData);
        return platos;
    });
}
// Función para insertar platos en la base de datos
function insertarPlatos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const platos = yield cargarPlatosDesdeJSON();
            yield sequelize_1.default.sync({ force: true }); // Precaución con `force: true`
            for (const plato of platos) {
                yield Plato_1.Plato.create({
                    nombre: plato.nombre,
                    origen: plato.origen,
                    ingredientes: plato.ingredientes,
                    kilocalorias: plato.kilocalorias,
                    carbohidratos: plato.carbohidratos,
                    grasas: plato.grasas,
                    peso: plato.peso,
                    precio: plato.precio,
                    tipo: plato.tipo,
                    imagen: plato.imagen,
                    descripcion: plato.descripcion,
                    stock: plato.stock
                });
            }
            console.log('Todos los platos fueron insertados exitosamente.');
        }
        catch (error) {
            console.error('Error al insertar platos:', error);
        }
    });
}
// Ejecuta la función de inserción
insertarPlatos();
