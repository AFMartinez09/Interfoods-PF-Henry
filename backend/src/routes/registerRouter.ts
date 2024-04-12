import express from "express";
import { signUpNewUser } from "../handlers/signUpNewUser";
import { newUser } from "../controllers/newUserDb";
import { findUserByEmail } from "../controllers/getUserByEmail";
import { updateUser } from "../controllers/putUser";
import { getAllUsers } from "../controllers/getAllUsers";
import {findUserById} from "../controllers/getUserById"
const router = express.Router();

router.post("/signup", signUpNewUser);
router.post("/signupDb", newUser);
router.get('/usuario/:email', findUserByEmail)
router.get("/usuarios", getAllUsers)
router.put('/usuario/update/:email', updateUser)
router.get('/getUsuario/:id', findUserById)

export default router;
