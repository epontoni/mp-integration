import WalletButton from "@/components/wallet-button";
import { MercadoPagoConfig, Preference } from "mercadopago"; // SDK de Mercado Pago

export default async function Home() {
  const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
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
    },
  });

  return (
    <main className="w-full h-full flex items-center justify-center">
      <WalletButton preferenceId={preference?.id!} />
    </main>
  );
}
