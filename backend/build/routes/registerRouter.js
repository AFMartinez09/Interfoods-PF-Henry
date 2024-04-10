"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signUpNewUser_1 = require("../handlers/signUpNewUser");
const newUserDb_1 = require("../controllers/newUserDb");
const getUserByName_1 = require("../controllers/getUserByName");
const putUser_1 = require("../controllers/putUser");
const getAllUsers_1 = require("../controllers/getAllUsers");
const router = express_1.default.Router();
router.post("/signup", signUpNewUser_1.signUpNewUser);
router.post("/signupDb", newUserDb_1.newUser);
router.get('/usuario/:email', getUserByName_1.findUserByEmail);
router.get("/usuarios", getAllUsers_1.getAllUsers);
router.put('/usuario/update/:email', putUser_1.updateUser);
exports.default = router;
