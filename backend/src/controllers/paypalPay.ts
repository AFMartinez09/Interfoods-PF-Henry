import { generateAccessToken, base } from "../config/paypal";

export const createOrder = async (
  product: string,
  price: string,
  description: string
) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
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

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const captureOrder = async (orderID: string) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
};

const handleResponse = async (response: Response) => {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
};
