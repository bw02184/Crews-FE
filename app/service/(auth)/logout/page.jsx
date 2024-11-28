'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    signOut();
    alert('로그아웃 되었습니다!');
    router.push('/service/login');
  }, []);
}
