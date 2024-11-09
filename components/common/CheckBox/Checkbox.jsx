import styles from './Checkbox.module.css';
import { Box, Checkbox, Flex, Text } from '@radix-ui/themes';

export default function CheckBox({ children, value, defaultChecked = false, disabled = false }) {
  return (
    <Box className={styles.checkbox}>
      <Text as="label" size="2">
        <Flex as="p" gap="2">
          <Checkbox value={value} defaultChecked={defaultChecked} disabled={disabled} />
          <Text as="span" weight="medium">
            {children}
          </Text>
        </Flex>
      </Text>
    </Box>
  );
}
