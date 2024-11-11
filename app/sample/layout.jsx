import { Box, Container } from '@radix-ui/themes';

export default function Layout({ children }) {
  return (
    <Container size="3">
      <Box p="3">{children}</Box>
    </Container>
  );
}
