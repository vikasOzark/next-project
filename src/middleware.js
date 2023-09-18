import { NextResponse } from "next/server";

const PUBLIC_ROUTE = ["/login", "/singup"]

export function middleware(request) {
  const auhtToken = request.cookies.get("token")?.value || false;
  if (auhtToken) {
      return NextResponse.next();
    } else {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
