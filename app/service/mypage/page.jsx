'use client';

import { logout } from '@/apis/authAPI';
import { signOut } from 'next-auth/react';

export default function Mypage() {
  return (
    <button
      onClick={async () => {
        await signOut();
        alert('로그아웃 되었습니다!');
      }}
    >
      로그아웃
    </button>
  );
}
