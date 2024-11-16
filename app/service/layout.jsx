'use client';

import Navigation from '@/components/common/Navigation/Navigation';
import { useSessionStatusStore } from '@/stores/authStore';
import { Flex } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Layout({ children }) {
  const { data: session } = useSession({
    refetchInterval: 0,
  });
  const { setSessionStatus } = useSessionStatusStore();

  useEffect(() => {
    if (session) setSessionStatus(true);
    else setSessionStatus(false);
  }, [session, setSessionStatus]);

  return (
    <div className="service">
      <div className="size">
        <Flex justify="center">
          <section className="landing">랜딩영역</section>
          <section className="webview">
            <div className="container">{children}</div>
            <Navigation />
          </section>
        </Flex>
      </div>
    </div>
  );
}
