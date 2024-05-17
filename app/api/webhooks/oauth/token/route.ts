import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Extract the "code" from the query params
  const queryString = "?" + request.url.split("?")[1];
  const params = new URLSearchParams(queryString);
  const code = params.get("code");

  // Extract the "sate" from the query params
  const state = params.get("state"); // The uuidv4 pasado al solicitar autorizar cobro

  // Client ID
  const client_id = process.env.NEXT_PUBLIC_MERCADOPAGO_CLIENT_ID!;

  // Client secret
  const client_secret = process.env.MERCADOPAGO_CLIENT_SECRET!;

  // Redurect URI
  const redirect_uri = process.env.NEXT_PUBLIC_APP_URL + "/api/oauth/token";

  // grant_type
  const grant_type = "authorization_code";

  // Auth URL
  const auth_url = `https://api.mercadopago.com/oauth/token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&grant_type=${grant_type}&redirect_uri=${redirect_uri}&test_token=true`;

  // Fetch the access token
  const response = await fetch(auth_url, {
    method: "POST", // Check the method
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: "Bearer ",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });

  return NextResponse.json({ success: true, response }, { status: 200 });
}
