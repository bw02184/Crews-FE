import { Flex } from '@radix-ui/themes';
import PinNumber from '@/components/common/PinNumber/PinNumber';
import { Suspense } from 'react';
import Step from '@/components/auth/signup/Step';
import PinNumberText from '@/components/common/PinNumber/PinNumberText';

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
