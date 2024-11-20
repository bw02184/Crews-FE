'use client';
import { Flex, Text } from '@radix-ui/themes';
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

      <div className={styles.cardContainer}>
        {transactionData.map((transaction) => (
          <div key={transaction.id} className={styles.historyCard}>
            <Flex direction="column" gap="2">
              <Flex direction="column" gap="0">
                <Text size="1" color="gray">
                  {transaction.datetime}
                </Text>
                <Text size="2" weight="bold">
                  {transaction.type}
                </Text>
              </Flex>

              <Flex justify="between" align="start">
                <Flex direction="column" gap="0">
                  <Text size="2" weight="medium">
                    {transaction.bankName}
                  </Text>
                  <Text size="2" color="gray">
                    {transaction.accountNumber}
                  </Text>
                </Flex>

                <Flex direction="column" gap="0" align="end">
                  <Flex align="center" gap="1">
                    <Text size="2">출금</Text>
                    <Text size="3" weight="bold" className={styles.ammountText}>
                      {transaction.amount.toLocaleString()}원
                    </Text>
                  </Flex>
                  <Text size="2" color="gray">
                    잔액 {transaction.balance.toLocaleString()}원
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </div>
        ))}
      </div>
    </Flex>
  );
}
