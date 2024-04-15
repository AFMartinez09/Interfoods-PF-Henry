import { compra } from "../config/coinbase";
import { CreateCharge } from "coinbase-commerce-node";

export const payWithCrypto = async (
  nombre: string,
  descripcion: string,
  precio: string,
  emailUser: string,
  nombreUser: string
) => {
  try {
    const chargeData: CreateCharge = {
      name: nombre,
      description: descripcion,
      pricing_type: "fixed_price",
      local_price: {
        amount: precio,
        currency: "USD",
      },
      metadata: {
        customer_name: nombreUser,
        customer_email: emailUser,
      },
      redirect_url: "http://localhost:3000/api/payments/redirect",
    };
    const response = await compra.create(chargeData);
    console.log("Orden creada con éxito:", response);
    return response; // Devuelve el objeto de carga creado
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw new Error(`Error al procesar el pago`);
  }
};
