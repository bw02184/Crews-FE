import { NavigationAdmin } from '@/components/common';
import { Container } from '@radix-ui/themes';

export default function Layout({ children }) {
  return (
    <div className="admin">
      <NavigationAdmin />
      <Container size="3" className="container">
        {children}
      </Container>
    </div>
  );
}
