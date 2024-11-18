import Navigation from '@/components/common/Navigation/Navigation';
import { Flex } from '@radix-ui/themes';

export default function Layout({ children }) {
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
