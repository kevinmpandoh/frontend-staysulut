import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isAuth = !!token;
  const url = request.nextUrl;

  // Jika user belum login dan akses halaman protected
  if (!isAuth && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Jika user sudah login dan coba akses /login atau /register
  // if (
  //   isAuth &&
  //   (url.pathname === "/auth/login" || url.pathname === "/auth/register")
  // ) {
  //   return NextResponse.redirect(new URL("/", request.url)); // redirect ke home
  // }

  // const url = request.nextUrl.pathname;

  // if (url.startsWith("/dashboard/admin") && role !== "admin") {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url));
  // }

  // if (url.startsWith("/dashboard/pemilik") && role !== "pemilik") {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/auth/register"], // Sesuaikan route
};
