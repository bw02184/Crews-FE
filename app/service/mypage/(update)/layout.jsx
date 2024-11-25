'use client';

import { useNavVisible } from '@/hooks/useNavVisible';

export default function Layout({ children }) {
  useNavVisible(false);
  return <>{children}</>;
}
