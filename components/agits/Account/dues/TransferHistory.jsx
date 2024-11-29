'use client';
import { Flex, Text } from '@radix-ui/themes';
import styles from './TransferHistory.module.css';
import { Title } from '@/components/common';

export default function TransferHistory({ transactionData }) {
  return (
    <Flex direction="column" gap="20px">
      <Title>이체내역</Title>
      <div className={styles.transfer_list}>
        <ul>
          {transactionData?.accountHistory?.map((transaction) => (
            <li key={transaction.duesId}>
              <Flex direction="column" gap="10px">
                <div className={styles.top}>
                  <Text as="span" size="1" className="gray_t2">
                    {transaction.dueDate}
                  </Text>
                  <Text as="p" size="2" weight="bold">
                    {transaction.agitName}
                  </Text>
                </div>
                <Flex justify="between" align="end" className={styles.btm}>
                  <div className={styles.account_info}>
                    <Text as="p" size="2" weight="medium">
                      {transaction.productName}
                    </Text>
                    <Text as="span" size="2" className="gray_t2">
                      {transaction.accountNumber}
                    </Text>
                  </div>
                  <Flex justify="end" align="center" gap="3px" asChild>
                    <Text as="p" size="2" weight="medium" className={styles.withdraw}>
                      <span>출금</span>
                      <em className="red">{transaction.dueAmount.toLocaleString()}</em>
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
