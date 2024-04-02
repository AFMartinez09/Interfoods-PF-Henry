import express from "express";
import { signUpNewUser } from "../handlers/signUpNewUser";
import { newUser } from "../controllers/newUserDb";

const router = express.Router();

router.post("/signup", signUpNewUser);
router.post("/signupDb", newUser);
export default router;
