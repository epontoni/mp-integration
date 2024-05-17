import WalletButton from "@/components/wallet-button";
import { MercadoPagoConfig, Preference } from "mercadopago"; // SDK de Mercado Pago

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
      marketplace: "MP-MKT-1647545615454062",
    },
  });

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <h2>Loguearse con cuenta vendedor (Orgenizer)</h2>
      <p>
        <a
          className="font-bold text-blue-500 hover:underline"
          href={`https://auth.mercadopago.com.ar/authorization?client_id=${"1647545615454062"}&response_type=code&platform_id=mp&redirect_uri=${"https://judges-bi-allowance-phone.trycloudflare.com/api/oauth/token"}`}
          target="_blank"
        >
          Autorizar cobros
        </a>
      </p>
      <WalletButton preferenceId={preference?.id!} />
    </main>
  );
}
