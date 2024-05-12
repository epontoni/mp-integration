import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const status = request.nextUrl.searchParams.get('status') as string;
    console.log("[STATUS]: ", status)
    console.log("[REQUEST]: ", request)
    return NextResponse.json({ success: true });
}