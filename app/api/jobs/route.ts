import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const publicKey = request.nextUrl.searchParams.get("pk");
  const origin = request.headers.get("origin");

  console.log(origin + "!!!");

  // verify origin is on the whitelist of a specific public key

  // return jobs

  const response = NextResponse.json({
    status: "OK",
  });

  return response;
}
