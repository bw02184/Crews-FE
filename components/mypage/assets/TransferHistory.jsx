'use client';
import { Flex, Text } from '@radix-ui/themes';
import styles from './TransferHistory.module.css';
import { Title } from '@/components/common';

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

export default function TransferHistory() {
  return (
    <Flex direction="column" gap="20px">
      <Title>이체내역</Title>
      <div className={styles.transfer_list}>
        <ul>
          {transactionData.map((transaction) => (
            <li key={transaction.id}>
              <Flex direction="column" gap="10px">
                <div className={styles.top}>
                  <Text as="span" size="1" className="gray_t2">
                    {transaction.datetime}
                  </Text>
                  <Text as="p" size="2" weight="bold">
                    {transaction.type}
                  </Text>
                </div>
                <Flex justify="between" align="end" className={styles.btm}>
                  <div className={styles.account_info}>
                    <Text as="p" size="2" weight="medium">
                      {transaction.bankName}
                    </Text>
                    <Text as="span" size="2" className="gray_t2">
                      {transaction.accountNumber}
                    </Text>
                  </div>
                  <Flex justify="end" align="center" gap="3px" asChild>
                    <Text as="p" size="2" weight="medium" className={styles.withdraw}>
                      <span>출금</span>
                      <em className="red">{transaction.amount.toLocaleString()}</em>
                      <span>원</span>
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </li>
          ))}
        </ul>
      </div>
    </Flex>
  );
}
