import { Header } from '@/components/common';
import MembershipFee from '@/components/mypage/MembershipFee/MembershipFee';
import TransferHistory from '@/components/mypage/assets/TransferHistory';
import { Flex } from '@radix-ui/themes';

export default function Page() {
  return (
    <div className="page">
      <Header side="center">회비 납부</Header>
      <Flex direction="column" gap="10px" className="content">
        <section>
          <MembershipFee />
        </section>
        <section>
          <TransferHistory />
        </section>
      </Flex>
    </div>
  );
}
