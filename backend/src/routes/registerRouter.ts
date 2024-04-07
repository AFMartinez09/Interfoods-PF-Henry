import express from "express";
import { signUpNewUser } from "../handlers/signUpNewUser";
import { newUser } from "../controllers/newUserDb";
import { findUserByEmail } from "../controllers/getUserByName";
import { updateUser } from "../controllers/putUser";

const router = express.Router();

router.post("/signup", signUpNewUser);
router.post("/signupDb", newUser);
router.get('/usuario/:email', findUserByEmail)
router.put('/usuario/update/:email', updateUser)

export default router;
