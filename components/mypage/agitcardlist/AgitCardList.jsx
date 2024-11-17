'use client';

import Sortdown from '../sortdowns/Sortdowns';

const { ImageCard } = require('@/components/common');
const { Flex } = require('@radix-ui/themes');

export default function AgitCardList({ data }) {
  const handlerAgit = () => {
    alert('버튼이 클릭되었습니다.');
  };
  return (
    <>
      <Sortdown />
      <Flex direction="column" gap="10px">
        {data.map((agit, i) => {
          return <ImageCard data={agit} key={`agit${i}`} onClick={handlerAgit}></ImageCard>;
        })}
      </Flex>
    </>
  );
}
