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
          <TransactionHistory />
        </section>
      </Flex>
    </div>
  );
}
