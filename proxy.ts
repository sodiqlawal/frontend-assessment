import { NextRequest, NextResponse } from 'next/server';
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(
      new URL('/users', request.url)
    );
  }
  return NextResponse.next();
}
