import React from 'react';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import styles from './CardInfo.module.css';

export default function CardInfo({ cardName, cardCode }) {
  return (
    <Card className={`${styles.card}`}>
      <Flex>
        <Box className={styles.txt_box}>
          <Box className={styles.txt}>
            <Box className={styles.title}>
              <Flex align="center">
                {cardName !== '' ? (
                  <Text as="span" size="2" weight="bold">
                    {cardName}
                  </Text>
                ) : (
                  <Text as="span" size="2" weight="medium">
                    아직 연결된 카드가 없습니다.
                  </Text>
                )}
              </Flex>
            </Box>
            {cardCode !== '' ? (
              <Box className={styles.intro}>
                <Text as="p" size="2" weight="medium" className="txt_line">
                  {cardCode}
                </Text>
              </Box>
            ) : (
              <Box>
                <Text as="p" size="2" weight="medium">
                  카드를 연결해주세요.
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Flex>
    </Card>
  );
}
