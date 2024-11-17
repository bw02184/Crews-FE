'use client';

import Sortdown from '../sortdowns/Sortdowns';
import Link from 'next/link';

const { ImageCard } = require('@/components/common');
const { Flex } = require('@radix-ui/themes');

export default function AgitCardList({ data }) {
  return (
    <>
      <Sortdown />
      <Flex direction="column" gap="10px">
        {data.map((agit, i) => {
          return (
            <Link href={`/agits/${agit.agitId}`} key={`agit${i}`}>
              <ImageCard data={agit} />
            </Link>
          );
        })}
      </Flex>
    </>
  );
}
