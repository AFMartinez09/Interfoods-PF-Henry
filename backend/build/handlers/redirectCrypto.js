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
exports.redirect = void 0;
const nodemailer_1 = require("../config/nodemailer");
const redirect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_email, user_name } = req.query;
    try {
        yield nodemailer_1.transporter.sendMail({
            from: process.env.EMAIL_INTERFOOD,
            to: `${user_email}, "grupointerfoods@gmail.com"`,
            subject: "Confirmación de compra en InterFood",
            html: `Hola ${user_name}, gracias por tu compra`,
        });
        res.status(200).send("Pago aprobado");
    }
    catch (error) {
        console.error("No pudimos aprobar el pago:", error);
        res.status(500).send(error);
    }
});
exports.redirect = redirect;
