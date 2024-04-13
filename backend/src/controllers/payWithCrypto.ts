import { resources } from "coinbase-commerce-node";

export const payWithCrypto = async (
  nombre: string,
  descripcion: string,
  emailUser: string,
  nombreUser: string
) => {
  try {
    const chargeDate = await resources.Charge.create({
      name: nombre,
      description: descripcion,
      pricing_type: "no_price",
      metadata: {
        customer_name: nombreUser,
        email: emailUser,
      },
      redirect_url: "http://localhost:3000/api/payments/redirect",
    });

    console.log("Orden creada con éxito :", chargeDate);
    return chargeDate;
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw new Error(`Error al procesar el pago`);
  }
};
