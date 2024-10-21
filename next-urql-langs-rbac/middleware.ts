import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  const protectedRoutes = ["/admin", "/dashboard"];

  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token || !token.roles.includes("admin")) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
