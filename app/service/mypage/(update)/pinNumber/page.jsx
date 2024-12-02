import { Header, PinNumber, PinNumberText } from '@/components/common';
import { Flex } from '@radix-ui/themes';
import { Suspense } from 'react';

export default function Page({ searchParams }) {
  return (
    <div className="page">
      <Header side="center">PIN번호 변경</Header>
      <div className="content">
        <section>
          <Flex direction="column" gap="20px">
            <PinNumberText stage={searchParams.stage} status={searchParams.status} defaultStage={'update'} />
            <Suspense>
              <PinNumber defaultStage={'update'} />
            </Suspense>
          </Flex>
        </section>
      </div>
    </div>
  );
}
