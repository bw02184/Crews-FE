'use client';

import { Header, PinNumber } from '@/components/common';
import PinNumberText from '@/components/common/PinNumber/PinNumberText';
import { useNavVisible } from '@/hooks/useNavVisible';
import { Flex } from '@radix-ui/themes';
import { Suspense } from 'react';

export default function PinAuth({ searchParams }) {
  useNavVisible(false);
  return (
    <div className="page">
      <Header side="center">PIN번호 인증</Header>
      <div className="content">
        <section>
          <Flex direction="column" gap="20px">
            <PinNumberText stage={searchParams.stage} defaultParams={'auth'} />
            <Suspense>
              <PinNumber defaultParams={'auth'} />
            </Suspense>
          </Flex>
        </section>
      </div>
    </div>
  );
}
