'use client';

import { Flex } from '@radix-ui/themes';
import { Header, ImageCard, SelectFilter, Title } from '../common';
import styles from '@/components/search/SearchResult.module.css';
import { useRef, useState } from 'react';
import {
  searchMenu,
  sortSelectDateList,
  sortSelectNameList,
  sortSelectPersonList,
} from '@/constants/selectMenuList/searchMenuList';
import Image from 'next/image';
import { agits } from '@/constants/dummy';

export default function SearchResult({ q }) {
  const [inputValue, setInputValue] = useState(q);
  const inputRef = useRef();

  return (
    <div className="page">
      <Header side="left">검색결과</Header>
      <div className="content">
        <section>
          <Flex direction="column" gap="20px">
            {/* 검색 폼 */}
            <Flex align="center" gap="10px" asChild>
              <form className={styles.search_form}>
                <SelectFilter filter="keyword" selectList={searchMenu}>
                  모임명
                </SelectFilter>
                <input
                  ref={inputRef}
                  type="text"
                  id="search_input"
                  placeholder="키워드를 입력해주세요!"
                  className={styles.search_form}
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                />
                <button type="submit" className={styles.search_form}>
                  <Image src="/icons/ico_search.svg" width={15} height={15} alt="검색하기" />
                </button>
              </form>
            </Flex>
            {/* 필터링 리스트 */}
            <Flex gap="2" justify="end" align="center">
              <SelectFilter filter="sort" selectList={sortSelectNameList}>
                이름
              </SelectFilter>
              <SelectFilter filter="sort" selectList={sortSelectDateList}>
                날짜
              </SelectFilter>
              <SelectFilter filter="sort" selectList={sortSelectPersonList}>
                인원
              </SelectFilter>
            </Flex>

            {/* 모임 리스트 */}
            <Flex direction="column" gap="10px">
              {agits.map((agit, i) => {
                return <ImageCard data={agit} key={`agit${i}`}></ImageCard>;
              })}
            </Flex>
          </Flex>
        </section>
      </div>
    </div>
  );
}
