'use client';

import { Box, Card, Flex, Text } from '@radix-ui/themes';
import styles from './NoAccount.module.css';
import Image from 'next/image';
import { useState } from 'react';

export default function NoAccount() {
  return (
    <div>
      <Card className={styles.card_dot}>
        <Flex justify="center" gap="10px">
          <Text as="p" size="2" weight="medium" className="gray_t1">
            모임통장을 생성/연결해 주세요!
          </Text>
        </Flex>

        <Box className={styles.img_box} align="center">
          <Box className={`${styles.img} back_img`} style={{ backgroundImage: `url(/icons/ico_blank_plus.svg)` }}>
            <Image src="/imgs/img_bg_bank.jpg" width={32} height={32} alt={`계좌 연결하기`} />
          </Box>
        </Box>
      </Card>
    </div>
  );
}
