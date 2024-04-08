import express from "express";
import { createOrder } from "../handlers/createOrder";
import { success } from "../handlers/success";
import { webhook } from "../handlers/webhook";

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/success", success);
router.post("/webhook", webhook);

export default router;
