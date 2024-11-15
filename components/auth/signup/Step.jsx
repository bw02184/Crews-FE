import styles from './Step.module.css';
import { Box, Flex, Text } from '@radix-ui/themes';

export default function Step({ activeIdx }) {
  return (
    <Box className={styles.step_list}>
      <Flex justify="center" align="start" gap="30px" asChild>
        <ul>
          {['정보 입력 및 본인인증', '주소 등록', '가입 완료'].map((text, i) => {
            return (
              <li key={`step${i}`} className={activeIdx == i + 1 ? styles.active : ''}>
                <Box className={styles.num}>
                  <i>{i + 1}</i>
                </Box>
                <Text as="p" size="2" weight="bold" mt="1">
                  {text}
                </Text>
              </li>
            );
          })}
        </ul>
      </Flex>
    </Box>
  );
}
