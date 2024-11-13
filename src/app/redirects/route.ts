import { NextRequest, NextResponse } from "next/server";
import redirects from "@/app/redirects/redirects.json";

type RedirectEntry = {
  destination: string;
  permanent: boolean;
};

export function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname");

  if (!pathname) {
    return new Response("Bad Request", { status: 400 });
  }

  const redirect = (redirects as Record<string, RedirectEntry>)[pathname];

  if (!redirect) {
    return new Response("No Redirect", { status: 400 });
  }

  return NextResponse.json(redirect);
}
