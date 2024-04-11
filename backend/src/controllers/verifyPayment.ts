import { pagos } from "../config/mercadoPago";

export const verifyPayment = async (dataId: any) => {
  try {
    if (dataId?.type === "payment") {
      const response = await pagos.capture(dataId.id);
      console.log(`El estado del pago es ${response.status}`);
      return response.status;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error al registrar el pago");
  }
};
