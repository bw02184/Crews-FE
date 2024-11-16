'use client';

import { useSessionStatusStore } from '@/stores/authStore';
import { signOut } from 'next-auth/react';

export default function Mypage() {
  const { setSessionStatus } = useSessionStatusStore();
  return (
    <div className="page">
      <div className="content">
        <section>
          <button
            onClick={async () => {
              await signOut();
              setSessionStatus(false);
              alert('로그아웃 되었습니다!');
            }}
          >
            로그아웃
          </button>
        </section>
      </div>
    </div>
  );
}
