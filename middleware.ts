import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const forwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const hostname = (forwardedHost.split(',')[0] || request.nextUrl.hostname).trim().split(':')[0].toLowerCase();
  const forwardedProto = (request.headers.get('x-forwarded-proto') || '').split(',')[0]?.trim().toLowerCase();
  const protocol = forwardedProto ? `${forwardedProto}:` : request.nextUrl.protocol;
  const isMainDomain = hostname === 'baituljannah.sch.id' || hostname === 'www.baituljannah.sch.id';
  const isSmpitDomain = hostname === 'smpitbaituljannah.sch.id' || hostname === 'www.smpitbaituljannah.sch.id';
  const isSmaitDomain = hostname === 'smaitbaituljannah.sch.id' || hostname === 'www.smaitbaituljannah.sch.id';

  const role = request.cookies.get('role')?.value;
  const token = request.cookies.get('token')?.value;
  const portal = request.cookies.get('portal')?.value;

  const isExpiredJwt = (rawToken: string | undefined) => {
    if (!rawToken) return true;
    const parts = rawToken.split('.');
    if (parts.length < 2) return true;
    try {
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
      const json = JSON.parse(atob(padded));
      const exp = Number(json?.exp);
      if (!exp) return true;
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  };

  const rules: { prefix: string; roles: string[] }[] = [
    { prefix: '/admin', roles: ['admin'] },
    { prefix: '/teacher', roles: ['teacher'] },
    { prefix: '/student', roles: ['student'] },
    { prefix: '/parent', roles: ['parent'] },
  ];

  const unitAdminMatch = pathname.match(/^\/(tkit|sdit|smpit|smait|slbit)\/admin(\/|$)/i);
  const matched = unitAdminMatch ? { prefix: unitAdminMatch[0], roles: ['admin'] } : rules.find((r) => pathname.startsWith(r.prefix));
  const hasValidToken = Boolean(token) && !isExpiredJwt(token);
  const expectedAdminPortal = (() => {
    if (unitAdminMatch) return unitAdminMatch[1].toLowerCase();
    if (isSmpitDomain && pathname.startsWith('/admin')) return 'smpit';
    if (isSmaitDomain && pathname.startsWith('/admin')) return 'smait';
    if (pathname.startsWith('/admin')) return 'main';
    return null;
  })();
  const portalOk = !expectedAdminPortal || portal === expectedAdminPortal;
  if (matched && (!role || !matched.roles.includes(role) || !hasValidToken || (matched.roles.includes('admin') && !portalOk))) {
    const loginPath = unitAdminMatch ? `/${unitAdminMatch[1].toLowerCase()}/login` : '/login';
    const url = new URL(loginPath, request.nextUrl);
    return NextResponse.redirect(url);
  }

  if (isSmpitDomain) {
    if (pathname === '/login') {
      const rewritten = request.nextUrl.clone();
      rewritten.pathname = '/smpit/login';
      return NextResponse.rewrite(rewritten);
    }
    if (pathname === '/smpit' || pathname.startsWith('/smpit/')) {
      return NextResponse.next();
    }
    const rewritten = request.nextUrl.clone();
    rewritten.pathname = pathname === '/' ? '/smpit' : `/smpit${pathname}`;
    return NextResponse.rewrite(rewritten);
  }

  if (isSmaitDomain) {
    if (pathname === '/login') {
      const rewritten = request.nextUrl.clone();
      rewritten.pathname = '/smait/login';
      return NextResponse.rewrite(rewritten);
    }
    if (pathname === '/smait' || pathname.startsWith('/smait/')) {
      return NextResponse.next();
    }
    const rewritten = request.nextUrl.clone();
    rewritten.pathname = pathname === '/' ? '/smait' : `/smait${pathname}`;
    return NextResponse.rewrite(rewritten);
  }

  if (isMainDomain && (pathname === '/smpit' || pathname.startsWith('/smpit/'))) {
    if (pathname === '/smpit/login' || pathname.startsWith('/smpit/admin')) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.hostname = 'smpitbaituljannah.sch.id';
    url.protocol = protocol === 'http:' ? 'https:' : protocol;
    url.port = '';
    url.pathname = pathname === '/smpit' ? '/' : pathname.replace(/^\/smpit/, '');
    if (!url.pathname.startsWith('/')) url.pathname = `/${url.pathname}`;
    return NextResponse.redirect(url);
  }

  if (isMainDomain && (pathname === '/smait' || pathname.startsWith('/smait/'))) {
    if (pathname === '/smait/login' || pathname.startsWith('/smait/admin')) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.hostname = 'smaitbaituljannah.sch.id';
    url.protocol = protocol === 'http:' ? 'https:' : protocol;
    url.port = '';
    url.pathname = pathname === '/smait' ? '/' : pathname.replace(/^\/smait/, '');
    if (!url.pathname.startsWith('/')) url.pathname = `/${url.pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|uploads).*)'],
};
