'use client';

const { ImageCard } = require('@/components/common');
const { Flex } = require('@radix-ui/themes');

export default function MyAgitList({ data }) {
  return (
    <Flex direction="column" gap="10px">
      {data.map((agit, i) => {
        return <ImageCard data={agit} key={`agit${i}`} />;
      })}
    </Flex>
  );
}
