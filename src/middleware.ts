import { NextResponse, NextRequest } from "next/server";
import { ScalableBloomFilter } from "bloom-filters";
import GeneratedBloomFilter from "./redirects/bloom-filter.json";
import { get } from "@vercel/edge-config";

type RedirectEntry = {
  destination: string;
  permanent: boolean;
};

const bloomFilter = ScalableBloomFilter.fromJSON(GeneratedBloomFilter as any);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (bloomFilter.has(pathname)) {
    const api = new URL(
      `/api/redirects?pathname=${encodeURIComponent(request.nextUrl.pathname)}`,
      request.nextUrl.origin
    );

    try {
      const redirectData = await fetch(api);

      if (redirectData.ok) {
        const redirectEntry: RedirectEntry | undefined =
          await redirectData.json();

        if (redirectEntry) {
          const statusCode = redirectEntry.permanent ? 308 : 307;

          return NextResponse.redirect(redirectEntry.destination, statusCode);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const redirectData = await get(pathname);

  if (redirectData && typeof redirectData === "string") {
    const redirectEntry: RedirectEntry = JSON.parse(redirectData);
    const statusCode = redirectEntry.permanent ? 308 : 307;
    return NextResponse.redirect(redirectEntry.destination, statusCode);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
