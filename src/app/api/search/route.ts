/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
}