// https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/your-integrations/notifications/webhooks
import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createHmac } from "crypto";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  const body = await request
    .json()
    .then((data) => data as { data: { id: string } });

  // VALIDATE THE ORIGIN OF THE NOTIFICATION
  // Obtain the x-signature value from the header
  const xSignature = request.headers.get("x-signature")!;
  const xRequestId = request.headers.get("x-request-id")!;

  // console.log("[x-signature]", xSignature);
  // console.log("[x-request-id]", xRequestId);

  // Obtain the ts (timestamp) and v1 values from the x-signature value
  const ts = xSignature.split(",")[0].split("=")[1];
  const v1 = xSignature.split(",")[1].split("=")[1];

  // Extract the "data.id" from the query params
  const queryString = "?" + request.url.split("?")[1];
  const params = new URLSearchParams(queryString);
  const dataId = params.get("data.id");

  // Obtain the secret key for the user/application from Mercadopago developers site
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET!;

  // Generate the manifest string
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

  // Create an HMAC signature defining the hash type and the key as a byte array
  const hmac = createHmac("sha256", secret).update(manifest).digest("hex");

  if (v1 !== hmac) {
    console.log("[ERROR]", "Invalid signature");
    // return Response.json({ success: false });
    return NextResponse.json({ error: "Invalid signature" }, { status: 500 });
  }

  console.log("[SUCCESS]", "Signature is valid!!!", body.data.id);

  //const payment = await new Payment(client).get({ id: body.data.id });

  //console.log("[PAYMENT]", payment);

  return NextResponse.json({ success: true }, { status: 200 });
}
