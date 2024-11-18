'use client';

import Sortdown from '../sortdowns/Sortdowns';

const { ImageCard } = require('@/components/common');
const { Flex } = require('@radix-ui/themes');

export default function AgitCardList({ data }) {
  return (
    <>
      <Sortdown />
      <Flex direction="column" gap="10px">
        {data.map((agit, i) => {
          return <ImageCard data={agit} key={`agit${i}`} />;
        })}
      </Flex>
    </>
  );
}
