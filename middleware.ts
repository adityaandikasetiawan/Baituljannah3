import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get('role')?.value;

  const rules: { prefix: string; roles: string[] }[] = [
    { prefix: '/admin', roles: ['admin'] },
    { prefix: '/teacher', roles: ['teacher'] },
    { prefix: '/student', roles: ['student'] },
    { prefix: '/parent', roles: ['parent'] },
  ];

  const matched = rules.find((r) => pathname.startsWith(r.prefix));
  if (!matched) return NextResponse.next();

  if (!role || !matched.roles.includes(role)) {
    const url = new URL('/login', request.nextUrl);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/teacher/:path*', '/student/:path*', '/parent/:path*'],
};
