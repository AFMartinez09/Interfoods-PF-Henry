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
exports.success = void 0;
const nodemailer_1 = require("../config/nodemailer");
const success = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, date_created, date_approved, status, payment_id, payment_type, transaction_amount, currency_id, description, buyer_email, user_email, user_name } = req.query;
    try {
        if (status === "approved") {
            console.log(`El pago con ID ${payment_id} ha sido aprobado`);
            // Envía correo electrónico al comprador
            yield nodemailer_1.transporter.sendMail({
                from: process.env.EMAIL_INTERFOOD,
                to: `${user_email}, "grupointerfoods@gmail.com"`,
                subject: "Confirmación de compra en InterFood",
                text: `¡Hola ${user_name}! Tu pago por ${description} ha sido aprobado. Detalles de la compra: ID de pago: ${payment_id}, Monto: ${transaction_amount} ${currency_id}. ¡Gracias por tu compra!`,
            });
            res.status(200).send({
                message: "Pago Exitoso",
                id: id,
                date_created: date_created,
                date_approved: date_approved,
                payment_type_id: payment_type,
                status: status,
                currency_id: currency_id,
                description: description,
                transaction_amount: transaction_amount,
                buyer_email: buyer_email,
            });
        }
        else {
            console.log(`No pudimos aprobar el pago con ID ${payment_id}`);
        }
    }
    catch (error) {
        console.error("No pudimos aprobar el pago:", error);
        res.status(500).send(error);
    }
});
exports.success = success;
