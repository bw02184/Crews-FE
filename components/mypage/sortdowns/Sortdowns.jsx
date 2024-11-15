'use client';

import { SelectFilter } from '@/components/common';
import { sortSelectMenuList } from '@/constants/selectMenuList/sample';
import { Flex } from '@radix-ui/themes';

export default function Sortdown() {
  return (
    <Flex justify="end" align="center" gap="10px">
      <SelectFilter filter="sort" selectList={sortSelectMenuList}>
        이름
      </SelectFilter>
      <SelectFilter filter="sort" selectList={sortSelectMenuList}>
        날짜
      </SelectFilter>
      <SelectFilter filter="sort" selectList={sortSelectMenuList}>
        인원
      </SelectFilter>
    </Flex>
  );
}
