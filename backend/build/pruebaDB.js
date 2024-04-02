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
const sequelize_1 = __importDefault(require("./sequelize"));
const Plato_1 = require("./Plato");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize_1.default.authenticate(); // Prueba la conexión con la base de datos
            console.log('Conexión con la base de datos establecida exitosamente.');
            // Recupera todos los platos existentes en la base de datos
            const platos = yield Plato_1.Plato.findAll();
            console.log('Platos encontrados:', platos.map(plato => plato.toJSON()));
        }
        catch (error) {
            console.error('No se pudo conectar con la base de datos:', error);
        }
    });
}
main();
