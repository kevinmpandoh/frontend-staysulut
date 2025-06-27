import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isAuth = !!token;
  const { pathname } = request.nextUrl;

  console.log(token, isAuth, "TESMIDDLEWARE");

  if (!isAuth && pathname.startsWith("/preferences")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (!isAuth && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (!isAuth && pathname.match(/^\/kosts\/[^/]+\/booking$/)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAuth) {
    const payload = await verifyJWT(token);
    const role = payload?.role;

    console.log(payload, "PAYLOAD");

    if (pathname.startsWith("/auth")) {
      // Jika user sudah login dan akses halaman auth, redirect ke dashboard
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      // Jika user bukan admin dan akses halaman admin
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/dashboard/owner") && role !== "owner") {
      // Jika user bukan pemilik dan akses halaman pemilik
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/user") && role !== "tenant") {
      // Jika user bukan user dan akses halaman user
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.match(/^\/kosts\/[^/]+\/booking$/) && role !== "tenant") {
      // Jika user bukan tenant dan akses halaman booking kost
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/user/:path*",
    "/auth/login",
    "/preferences",
    "/auth/register",
    "/kosts/:id*/booking",
  ], // Sesuaikan route
};
