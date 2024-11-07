'use client';

import { useNavStore } from '@/stores/layoutStore';
import { useEffect } from 'react';

export default function Payment() {
  const { setNavVisible } = useNavStore();

  useEffect(() => {
    setNavVisible(false);
    return () => setNavVisible(true);
  }, []);

  return <div>결제 페이지</div>;
}
