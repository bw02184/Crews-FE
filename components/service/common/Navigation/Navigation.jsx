'use client';

import { useNavStore } from '@/stores/layoutStore';
import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
  const { navVisible } = useNavStore();

  return (
    navVisible && (
      <div className="navigation">
        <nav>
          <ul>
            <li>
              <Link href="/">홈</Link>
            </li>
            <li>
              <Link href="/service/search">검색</Link>
            </li>
            <li className="payment">
              <Link href="/service/payment">결제</Link>
            </li>
            <li>
              <Link href="/service/agits">아지트</Link>
            </li>
            <li>
              <Link href="/service/mypage">마이페이지</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  );
}
