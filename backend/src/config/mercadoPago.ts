import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

const accessToken = process.env.TOKEN_MERCADO_PAGO || "";

const client = new MercadoPagoConfig({
  accessToken: accessToken,
});

export const preference = new Preference(client);
export const pagos = new Payment(client);
