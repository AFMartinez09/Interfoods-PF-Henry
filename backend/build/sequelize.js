"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const sequelize_typescript_1 = require("sequelize-typescript");
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const { URL } = process.env;
if (!URL) {
    throw new Error('La variable de entorno URL no está definida en el archivo .env');
}
const sequelize = new sequelize_typescript_1.Sequelize(URL, {
    dialect: 'postgres',
    models: [path_1.default.join(__dirname, 'models')],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true
        }
    }
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log('Conexión con la base de datos establecida exitosamente.');
            // Sincroniza los modelos con la base de datos
            yield sequelize.sync();
            console.log('Modelos sincronizados con la base de datos.');
            // Accede a los modelos después de que la conexión se haya establecido
            const models = sequelize.models;
            Object.keys(models).forEach((modelName) => __awaiter(this, void 0, void 0, function* () {
                const instances = yield models[modelName].findAll();
                console.log(`Modelo: ${modelName}, Instancias: ${instances.length}`);
            }));
        }
        catch (error) {
            console.error('No se pudo conectar con la base de datos:', error);
        }
    });
}
main();
exports.default = sequelize;
