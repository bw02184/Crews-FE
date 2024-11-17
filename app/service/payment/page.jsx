'use client';

import { useNavVisible } from '@/hooks/useNavVisible';

export default function Payment() {
  useNavVisible(false);

  return <div>결제 페이지</div>;
}
