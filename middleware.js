'use server';
import { auth } from './auth';
import { NextResponse } from 'next/server';
import { signOut } from 'next-auth/react';

export default async function middleware(request) {
  console.log('middleware 접속');

  const session = await auth();
  const isAgits = request.url.includes('/service/agits') && !request.url.includes('/service/agits/');

  if (!isAgits && session?.error === 'RefreshAccessTokenError') {
    console.log('RefreshAccessTokenError()');
    await signOut(); // auth js 로그아웃
    return NextResponse.redirect(new URL('/service/login', request.url));
  }

  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;

  if (!isAgits && !accessToken && !refreshToken) {
    console.log('No authToken found, redirecting to /login');
    return NextResponse.redirect(new URL('/service/login', request.url));
  }

  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ['/service/agits/:path*', '/service/payment', '/service/mypage'],
};
