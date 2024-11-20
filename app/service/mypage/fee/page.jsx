import { Header } from '@/components/common';
import FeePayment from '@/components/mypage/assets/FeePayment';
import TransactionHistory from '@/components/mypage/assets/TransactionHistory';
import { Flex } from '@radix-ui/themes';

export default function Page() {
  return (
    <div className="page">
      <Header side="center">회비 납부</Header>
      <Flex direction="column" gap="10px" className="content">
        <section>
          <FeePayment />
        </section>
        <section>
          <TransactionHistory
            title="이체 내역"
            datetime="2024.11.04 12:00"
            bankName="우리꿈 저축예금"
            accountNumber="110-467-158676"
            amount={120000}
            balance={423558}
          />
        </section>
      </Flex>
    </div>
  );
}
