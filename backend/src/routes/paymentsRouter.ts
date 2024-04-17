import express from "express";
import { createOrder } from "../handlers/createOrder";
import { success } from "../handlers/success";
import { webhook } from "../handlers/webhook";
import { createCompra } from "../controllers/postCompra";
import { getAllCompras } from "../controllers/getCompras";
import { getCompraByUserId } from "../controllers/getCompraForUser";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/success", success);
router.post("/webhook", webhook);
router.post('/compra', createCompra)
router.get("/compras", getAllCompras);
router.get("/compra/:usuarioId", getCompraByUserId);


export default router;
