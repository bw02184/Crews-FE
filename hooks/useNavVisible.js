'use client';

import { useNavStore } from '@/stores/layoutStore';
import { useEffect } from 'react';

export const useNavVisible = (isVisible) => {
  const { setNavVisible } = useNavStore();

  useEffect(() => {
    setNavVisible(isVisible);
    return () => setNavVisible(!isVisible);
  }, []);
};
