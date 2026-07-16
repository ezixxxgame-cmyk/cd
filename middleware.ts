import { NextRequest, NextResponse } from "next/server";

const LEGACY_DOMAIN = "cd-wa1dx.vercel.app";

export function middleware(request: NextRequest) {
  const blockingEnabled = process.env.BLOCK_LEGACY_DOMAIN !== "false";
  const requestHost = (
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    ""
  )
    .split(",")[0]
    .trim()
    .split(":")[0]
    .toLowerCase();

  if (blockingEnabled && requestHost === LEGACY_DOMAIN) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow"
      }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*"
};
