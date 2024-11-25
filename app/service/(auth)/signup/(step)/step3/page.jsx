import { Flex } from '@radix-ui/themes';
import { Suspense } from 'react';
import Step from '@/components/auth/signup/Step';
import { PinNumber, PinNumberText } from '@/components/common';

export default function Page({ searchParams }) {
  return (
    <>
      <section>
        <Flex direction="column" gap="20px">
          <Step activeIdx={3} />
          <PinNumberText stage={searchParams.stage} status={searchParams.status} defaultParams={'create'} />
          <Suspense>
            <PinNumber defaultParams={'create'} />
          </Suspense>
        </Flex>
      </section>
    </>
  );
}
