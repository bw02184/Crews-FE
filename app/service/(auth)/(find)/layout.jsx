'use client';

import { useNavVisible } from '@/hooks';

export default function Layout({ children }) {
  useNavVisible(false);
  return <div className="page">{children}</div>;
}
