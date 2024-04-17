"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compra = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Usuario_1 = require("./Usuario");
let Compra = class Compra extends sequelize_typescript_1.Model {
};
exports.Compra = Compra;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Compra.prototype, "totalProductos", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Compra.prototype, "totalGasto", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Usuario_1.Usuario),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Compra.prototype, "usuarioId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Usuario_1.Usuario),
    __metadata("design:type", Usuario_1.Usuario)
], Compra.prototype, "usuario", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: false,
    }),
    __metadata("design:type", Array)
], Compra.prototype, "detallesPlatos", void 0);
exports.Compra = Compra = __decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: 'Compra',
        tableName: 'Compras',
    })
], Compra);
