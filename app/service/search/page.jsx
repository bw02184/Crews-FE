import { Box, Flex, RadioGroup, Text } from '@radix-ui/themes';
import { Header, SelectFilter } from '@/components/common';
import { searchMenu } from '@/constants/selectMenuList/searchMenuList';
import Image from 'next/image';
import styles from './page.module.css';

export default function Search() {
  return (
    <div className="page">
      <Header side="left">검색하기</Header>
      <div className="content">
        <section>
          <Flex align="center" gap="2" asChild>
            {/* 셀렉트 박스 */}
            <form className={styles.search_form}>
              <SelectFilter filter="keyword" selectList={searchMenu}>
                모임명
              </SelectFilter>
              {/* 검색 입력창 */}
              <input
                type="text"
                id="search_input"
                placeholder="키워드를 입력해주세요!"
                className="search-input"
              ></input>
              <button type="submit">
                <Image src="/icons/search_icon.svg" width={15} height={15} alt="검색하기" />
              </button>
              <Text as="p" weight="medium" mb="1">
                최근 검색어
              </Text>
              {/* <ButtonS
                type="submit"
                style="right"
                icon={{ src: '/icons/search_icon.svg', width: '15', height: '15', alt: '삭제' }}
              ></ButtonS> */}
            </form>
          </Flex>
        </section>
      </div>
    </div>
  );
}
