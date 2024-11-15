'use client';

import { Box, Flex, Text } from '@radix-ui/themes';
import styles from './AccountDetail.module.css';
import { date } from './date';

export default function AccountDetail({ accountDetail }) {
  return (
    <li className={styles.account}>
      <Box className={styles.top}>
        <Text as="p" size="1" weight="medium">
          {date(accountDetail.transactionTime)}
        </Text>
        <em>{accountDetail.description}</em>
      </Box>
      <Box className={styles.btm} align="right">
        <Flex justify="end" align="center" gap="3px" asChild>
          <Text as="p" size="1" weight="medium" className={styles.withdrawerName}>
            <span>
              {accountDetail.withdrawerName} {accountDetail.tranType === 'DEPOSIT' ? '입금' : '출금'}
            </span>
            <em className={`${accountDetail.tranType === 'DEPOSIT' ? styles.blue : styles.red}`}>
              {accountDetail.tranAmount.toLocaleString('ko-KR')}
            </em>
            <span>원</span>
          </Text>
        </Flex>
        <Box className={styles.afterBalanceAmount}>
          <Text as="p" size="1" weight="medium">
            잔액 {accountDetail.afterBalanceAmount.toLocaleString('ko-KR')} 원
          </Text>
        </Box>
      </Box>
    </li>
  );
}
