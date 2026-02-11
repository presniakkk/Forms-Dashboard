import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/forms', '/dashboard'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get('role')?.value;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!role) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const adminOnlyRoutes = ['/forms/new'];
  const isEditRoute = /^\/forms\/[^/]+$/.test(pathname) && pathname !== '/forms';
  const isAdminOnly = adminOnlyRoutes.some((r) => pathname.startsWith(r)) || isEditRoute;

  if (isAdminOnly && role !== 'admin') {
    const formsUrl = new URL('/forms', request.url);
    return NextResponse.redirect(formsUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/forms/:path*', '/dashboard/:path*'],
};