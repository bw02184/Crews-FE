'use client';

import { useNavStore } from '@/stores/layoutStore';
import { useEffect } from 'react';

export default function Layout({ children }) {
  const { setNavVisible } = useNavStore();

  useEffect(() => {
    setNavVisible(false);
    return () => setNavVisible(true);
  }, []);
  return <div className="page">{children}</div>;
}
