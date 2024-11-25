import ArrowButton from '@/components/agits/Account/ArrowButton';
import FeePayment from '@/components/agits/Account/FeePayment';
import { Header } from '@/components/common';
import TransferHistory from '@/components/mypage/assets/TransferHistory';

import { date } from '@/constants/dummy';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Callout, Flex } from '@radix-ui/themes';

export default async function Page() {
  return (
    <div className="page">
      <header>
        <Header side="center">회비 납부</Header>
      </header>
      <Flex direction="column" gap="10px" className="content">
        {date.dueAmount === null ? (
          <section>
            <Callout.Root color="green">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>납부완료!</Callout.Text>
            </Callout.Root>
          </section>
        ) : (
          <>
            <section>
              <ArrowButton data={date}></ArrowButton>
              <Callout.Root color="red" mt="3">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  회비 납부일이 지났어요! 빨리 {date.dueAmount.toLocaleString('ko-KR')}원을 납부해주세요.
                </Callout.Text>
              </Callout.Root>
            </section>
            <section>
              <FeePayment></FeePayment>
            </section>
          </>
        )}
        <section>
          <TransferHistory></TransferHistory>
        </section>
      </Flex>
    </div>
  );
}
