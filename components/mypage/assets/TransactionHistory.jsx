'use client';
import { Box, Flex, Text } from '@radix-ui/themes';
import styles from './TransactionHistory.module.css';

const transactionData = [
  {
    id: 1,
    datetime: '2024.11.04 12:00',
    type: '어쩌구모임',
    bankName: '우리꿈 저축예금',
    accountNumber: '110-467-158676',
    amount: 120000,
    balance: 423558,
  },
  {
    id: 2,
    datetime: '2024.11.04 12:00',
    type: '저쩌구모임',
    bankName: '우리꿈 저축예금',
    accountNumber: '110-467-158676',
    amount: 120000,
    balance: 423558,
  },
];

export default function TransactionHistory() {
  return (
    <Flex direction="column" gap="3">
      <Text size="6" weight="bold">
        이체내역
      </Text>

      <ul className={styles.cardContainer}>
        {transactionData.map((transaction) => (
          <li key={transaction.id} className={styles.historyCard}>
            <Flex direction="column" gap="2">
              <Flex direction="column" gap="0">
                <Text size="1" className="gray_t2">
                  {transaction.datetime}
                </Text>
                <Text size="2" weight="bold">
                  {transaction.type}
                </Text>
              </Flex>

              <Flex justify="between" align="end">
                <Flex direction="column" gap="0">
                  <Text size="2" weight="medium">
                    {transaction.bankName}
                  </Text>
                  <Text size="2" className="gray_t2">
                    {transaction.accountNumber}
                  </Text>
                </Flex>

                <Flex direction="column" gap="0" align="start">
                  <Flex align="center" gap="1">
                    <Text size="2">출금</Text>
                    <Box>
                      <Text size="3" weight="bold" className="red">
                        {transaction.amount.toLocaleString()}
                      </Text>
                      <Text size="2">원</Text>
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </li>
        ))}
      </ul>
    </Flex>
  );
}
