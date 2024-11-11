import styles from './Title.module.css';
import { Box, Strong } from '@radix-ui/themes';

export default function Title({ children }) {
  return (
    <Box className={styles.title}>
      <Strong>{children}</Strong>
    </Box>
  );
}
