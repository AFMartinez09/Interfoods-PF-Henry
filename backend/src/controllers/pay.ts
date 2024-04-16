import { preference } from "../config/mercadoPago";

export const pay = async (
  idCompra: string,
  producto: string,
  precio: number,
  idUsuario: string,
  emailUser: string,
  nombreUser: string
) => {
  try {
    const response = await preference.create({
      body: {
        items: [
          {
            id: idCompra,
            title: producto,
            unit_price: precio,
            quantity: 1,
            currency_id: "ARS",
          },
        ],
        metadata: {
          idUsuario: idUsuario,
          emailUser: emailUser,
          nombreUser: nombreUser,
        },
        back_urls: {
          // success: "https://interfoods.netlify.app/api/payments/success", //ruta de deploy
          // success: "http://localhost:3000/api/payments/success", //ruta local
          success: "http://localhost:5173/api/payments/success", //ruta local
          failure: "",
          pending: "",
        },
        auto_return: "approved",
        binary_mode: true,
        notification_url:
          // "https://interfoods.netlify.app",
          "https://fc40-93-40-64-152.ngrok-free.app/api/payments/webhook", //Aca debemos agregar la ruta en la cual se ha hecho el deploy
      },
    });
    console.log("URL: " + response.init_point);
    return response.init_point;
  } catch (error) {
    console.log(error);
    throw new Error(`Error al procesar el pago con ${idCompra}`);
  }
};
