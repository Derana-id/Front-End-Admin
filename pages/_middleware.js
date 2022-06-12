import { NextResponse } from 'next/server';

export default function middleware(req) {
  const { token } = req.cookies;
  const { pathname, origin } = req.nextUrl;
  if (!token && pathname !== '/auth/login') {
    return NextResponse.redirect(`${origin}/auth/login`);
  }
}
