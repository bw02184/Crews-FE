import { Landing } from '@/components/common';
import Navigation from '@/components/common/Navigation/Navigation';
import { Flex } from '@radix-ui/themes';

export default function Layout({ children }) {
  return (
    <div className="service">
      <div className="size">
        <Flex justify="center">
          <section className="landing">
            <Landing />
          </section>
          <section className="webview">
            <div className="container">{children}</div>
            <Navigation />
          </section>
        </Flex>
      </div>
    </div>
  );
}
