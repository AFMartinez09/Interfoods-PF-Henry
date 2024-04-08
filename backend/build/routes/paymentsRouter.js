"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createOrder_1 = require("../handlers/createOrder");
const success_1 = require("../handlers/success");
const webhook_1 = require("../handlers/webhook");
const router = express_1.default.Router();
router.post("/create-order", createOrder_1.createOrder);
router.get("/success", success_1.success);
router.post("/webhook", webhook_1.webhook);
exports.default = router;
