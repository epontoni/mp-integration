import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const status = request.nextUrl.searchParams.get('status') as string;
    console.log("[STATUS]: ", status)
    console.log("[REQUEST]: ", request)

    // Payment data
    const collection_id = request.nextUrl.searchParams.get('collection_id') as string;
    const collection_status = request.nextUrl.searchParams.get('collection_status') as string;
    const payment_id = request.nextUrl.searchParams.get('payment_id') as string;
    const merchant_order_id = request.nextUrl.searchParams.get('merchant_order_id') as string;
    const preference_id = request.nextUrl.searchParams.get('preference_id') as string;

    const payment_data = {
        collection_id,
        collection_status,
        payment_id,
        merchant_order_id,
        preference_id
    }

    switch (status) {
        case "approved":
          return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL!}/orders/checkout/success`);
        case "rejected":
          return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL!}/orders/checkout/rejected`);
        default:
          return NextResponse.json({ success: false, message: "Invalid status"});
      }
}