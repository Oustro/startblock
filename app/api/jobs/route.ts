import { NextResponse, NextRequest } from "next/server";
import { verifyOrigin, getJobs } from "@/lib/public";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export async function GET(request: NextRequest) {
  const redis = new Redis({
    url: process.env.UPSTASH_URL || "",
    token: process.env.UPSTASH_TOKEN || "",
  });

  const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "10 s"),
  });

  const identifier = "SDK API";
  const { success } = await ratelimit.limit(identifier);

  if (!success) {
    return NextResponse.json(
      { message: "Rate limit exceeded" },
      { status: 429 }
    );
  }

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

  const jobs = await getJobs(publicKey.slice(3));

  const response = NextResponse.json({
    status: "OK",
    jobs: jobs,
  });

  return response;
}
