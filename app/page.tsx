import WalletButton from "@/components/wallet-button";
import { MercadoPagoConfig, Preference } from "mercadopago"; // SDK de Mercado Pago

import { initMercadoPago } from "@mercadopago/sdk-react";
initMercadoPago("TEST-bce5c87b-601f-4b84-a229-51e8689e326a"); // YOUR_PUBLIC_KEY

export default async function Home() {
  const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!, // Cambiar por el access_token de la cuenta vendedor obtenido en /api/oauth/token)
  });

  const preference = await new Preference(client).create({
    body: {
      items: [
        {
          id: "1234",
          title: "Mi producto",
          quantity: 1,
          currency_id: "ARS",
          unit_price: 10,
        },
      ],
      back_urls: {
        success:
          "https://mp-payment-integration.vercel.app/api/webhooks/mercadopago/notifications",
        failure:
          "https://mp-payment-integration.vercel.app/api/webhooks/mercadopago/notifications",
      },
      auto_return: "approved",
      binary_mode: true, // aprobados o rechazados.
      marketplace_fee: 1,
      marketplace: `MP-MKT-${process.env.NEXT_PUBLIC_MERCADOPAGO_CLIENT_ID}`,
    },
  });

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <h2>Loguearse con cuenta vendedor (Orgenizer)</h2>
      <p>
        <a
          className="font-bold text-blue-500 hover:underline"
          href={`https://auth.mercadopago.com.ar/authorization?client_id=${process.env.NEXT_PUBLIC_MERCADOPAGO_CLIENT_ID}&response_type=code&platform_id=mp&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/token`}
          target="_blank"
        >
          Autorizar cobros
        </a>
      </p>
      <WalletButton preferenceId={preference?.id!} />
    </main>
  );
}
