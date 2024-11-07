'use client';

import Navigation from '@/components/service/common/Navigation/Navigation';
import { Flex } from '@radix-ui/themes';

export default function Layout({ children }) {
  return (
    <div className="service">
      <div className="size">
        <Flex>
          <section className="landing">랜딩영역</section>
          <section className="webview">
            <div className="content">{children}</div>
            <Navigation />
          </section>
        </Flex>
      </div>
    </div>
  );
}
