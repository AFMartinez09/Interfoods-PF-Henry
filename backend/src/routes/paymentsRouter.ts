import express from "express";
import { createOrder } from "../handlers/createOrder";
import { success } from "../handlers/success";
import { webhook } from "../handlers/webhook";
import { payCrypto } from "../handlers/crypto";
import { redirect } from "../handlers/redirectCrypto";

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/success", success);
router.post("/webhook", webhook);
router.post("/pay-crypto", payCrypto);
router.get("/redirect", redirect);

export default router;
