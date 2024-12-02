'use client';

import Link from 'next/link';
import styles from './NavigationAdmin.module.css';
import { Container, Flex } from '@radix-ui/themes';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function NavigationAdmin() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.role == 'ROLE_USER') {
    alert('접근할 수 없는 페이지 입니다!');
    router.push('/service');
  }

  return (
    <div className={styles.navigation}>
      <Container size="3" asChild>
        <header>
          <Flex justify="between" align="center">
            <Flex align="center" gap="10px" className={styles.title}>
              <h1>크루즈 관리자 페이지</h1>
              <button>로그아웃</button>
            </Flex>
            <nav>
              <Flex align="center" gap="30px" asChild>
                <ul>
                  <li>
                    <Link href="/admin" className={pathname == '/admin' ? `${styles.active}` : ''}>
                      서비스 관리
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin" className={pathname.startsWith('/admin/user') ? `${styles.active}` : ''}>
                      사용자 관리
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin" className={pathname.startsWith('/admin/log') ? `${styles.active}` : ''}>
                      로그 관리
                    </Link>
                  </li>
                </ul>
              </Flex>
            </nav>
          </Flex>
        </header>
      </Container>
    </div>
  );
}
