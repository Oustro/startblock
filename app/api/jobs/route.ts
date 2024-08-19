import { NextResponse, NextRequest } from "next/server";
import { verifyOrigin } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const publicKey = request.nextUrl.searchParams.get("pk");
  const origin = request.headers.get("origin");

  if (publicKey === null) {
    return NextResponse.json("Public key not provided", { status: 400 });
  } else if (origin === null) {
    return NextResponse.json("Origin not provided", { status: 400 });
  }

  if (publicKey.slice(0, 3) !== "pk_") {
    return NextResponse.json("Invalid public key", { status: 400 });
  }

  const verified = await verifyOrigin(origin, publicKey.slice(3));

  if (!verified) {
    return NextResponse.json("Invalid public key", { status: 400 });
  }

  // fetch jobs from database and return them

  const response = NextResponse.json({
    status: "OK",
  });

  return response;
}
