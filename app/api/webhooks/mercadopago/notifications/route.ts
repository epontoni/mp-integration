import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const status = request.nextUrl.searchParams.get('status') as string;
    console.log("[STATUS]: ", status)
    console.log("[REQUEST]: ", request)

    switch (status) {
        case "approved":
          return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL!}/success`);
        case "rejected":
          return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL!}/rejected`);
        default:
          return NextResponse.json({ success: false, message: "Invalid status"});
      }
}