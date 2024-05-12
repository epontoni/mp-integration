import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const status = request.nextUrl.searchParams.get('status') as string;
    console.log(status)
    return NextResponse.json({ success: true });
}