'use client';

import { Header } from '@/components/common';
import { useNavStore } from '@/stores/layoutStore';
import { useEffect } from 'react';

export default function Layout({ children }) {
  const { setNavVisible } = useNavStore();

  useEffect(() => {
    setNavVisible(false);
    return () => setNavVisible(true);
  }, []);
  return (
    <div className="page">
      <Header side="center">회원가입</Header>
      <div className="content">{children}</div>
    </div>
  );
}
