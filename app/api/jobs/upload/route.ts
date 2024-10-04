import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export async function POST(request: Request): Promise<NextResponse> {
  const redis = new Redis({
    url: process.env.REDIS_URL || "",
    token: process.env.REDIS_PASS || "",
  });

  const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "10 s"),
  });

  const identifier = "File Upload API";
  const { success } = await ratelimit.limit(identifier);

  if (!success) {
    return NextResponse.json(
      { message: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (filename && request.body) {
    const blob = await put(filename, request.body, {
      access: "public",
    });

    return NextResponse.json(blob);
  }

  return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
}
