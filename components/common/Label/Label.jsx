import styles from './Label.module.css';
import { Text } from '@radix-ui/themes';

export default function Label({ style, children }) {
  return (
    <Text as="span" size="2" weight="bold" className={`${styles.label} ${style}`}>
      {children}
    </Text>
  );
}
