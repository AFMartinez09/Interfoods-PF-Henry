"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureOrder = exports.createOrder = void 0;
const paypal_1 = require("../config/paypal");
const createOrder = (product, price, description) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield (0, paypal_1.generateAccessToken)();
    const url = `${paypal_1.base}/v2/checkout/orders`;
    const purchaseUnits = () => {
        return {
            amount: {
                currency_code: "USD",
                value: price, // Aquí deberías ajustar el precio de acuerdo al producto
            },
            items: [
                {
                    name: product,
                    description: description,
                    quantity: 1,
                    category: "PHYSICAL_GOODS", // Ajusta la categoría según corresponda
                    unit_amount: {
                        currency_code: "USD",
                        value: price, // Igual al precio total del producto
                    },
                },
            ],
        };
    };
    const payload = {
        intent: "CAPTURE",
        purchase_units: purchaseUnits,
    };
    const response = yield fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
    });
    return handleResponse(response);
});
exports.createOrder = createOrder;
const captureOrder = (orderID) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield (0, paypal_1.generateAccessToken)();
    const url = `${paypal_1.base}/v2/checkout/orders/${orderID}/capture`;
    const response = yield fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return handleResponse(response);
});
exports.captureOrder = captureOrder;
const handleResponse = (response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jsonResponse = yield response.json();
        return {
            jsonResponse,
            httpStatusCode: response.status,
        };
    }
    catch (err) {
        const errorMessage = yield response.text();
        throw new Error(errorMessage);
    }
});
