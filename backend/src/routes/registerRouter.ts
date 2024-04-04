import express from "express";
import { signUpNewUser } from "../handlers/signUpNewUser";
import { newUser } from "../controllers/newUserDb";
import { findUserByEmail } from "../controllers/getUserByName";

const router = express.Router();

router.post("/signup", signUpNewUser);
router.post("/signupDb", newUser);
router.get('/usuario/:email', findUserByEmail)

export default router;
