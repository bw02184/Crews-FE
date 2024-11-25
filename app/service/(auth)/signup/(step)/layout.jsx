'use client';

import { Header } from '@/components/common';
import { useNavVisible } from '@/hooks';

export default function Layout({ children }) {
  useNavVisible(false);
  return (
    <div className="page">
      <Header side="center">회원가입</Header>
      <div className="content">{children}</div>
    </div>
  );
}
