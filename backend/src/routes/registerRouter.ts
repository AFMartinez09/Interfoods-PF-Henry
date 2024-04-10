import express from "express";
import { signUpNewUser } from "../handlers/signUpNewUser";
import { newUser } from "../controllers/newUserDb";
import { findUserByEmail } from "../controllers/getUserByName";
import { updateUser } from "../controllers/putUser";
import { getAllUsers } from "../controllers/getAllUsers";
const router = express.Router();

router.post("/signup", signUpNewUser);
router.post("/signupDb", newUser);
router.get('/usuario/:email', findUserByEmail)
router.get("/usuarios", getAllUsers)
router.put('/usuario/update/:email', updateUser)

export default router;
