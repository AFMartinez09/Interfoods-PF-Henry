"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getFood_1 = require("../controllers/getFood");
const postFood_1 = require("../controllers/postFood");
const putFood_1 = require("../controllers/putFood");
const deleteFood_1 = require("../controllers/deleteFood");
const getFoodFiltro_1 = require("../controllers/getFoodFiltro");
const router = express_1.default.Router();
router.get("/", getFood_1.getFood);
router.post('/postFood', postFood_1.createFood);
router.put("/:id", putFood_1.updateFood);
router.delete("/:id", deleteFood_1.deleteFood);
router.get("/filtro", getFoodFiltro_1.getFoodFiltro);
exports.default = router;
