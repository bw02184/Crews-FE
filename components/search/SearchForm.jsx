'use client';
import { Flex, Text } from '@radix-ui/themes';
import { Header, SelectFilter, Title } from '@/components/common';
import { searchMenu } from '@/constants/selectMenuList/searchMenuList';
import Image from 'next/image';
import { useState, useRef } from 'react';
import styles from '@/components/search/SearchForm.module.css';

export default function SearchForm() {
  const [inputValue, setInputValue] = useState('');
  const [buttonDummy, setButtonDummy] = useState([
    '강아지',
    '치킨',
    '노래방',
    '조기축구회',
    '리그오브레전드',
    '발로란트',
    '대상혁',
    'Faker',
    '숭배',
    '러닝',
    '테스트',
    '시험',
    '자격증',
    '갓재연',
    '갓갓갓',
  ]);
  const inputRef = useRef();

  // 검색어 클릭 시 input에 값 입력
  const handleTextClick = (text) => {
    setInputValue(text);
    if (inputRef.current) {
      inputRef.current.value = text;
    }
  };

  // 검색어 삭제 핸들러
  const removeItemHandler = (index, event) => {
    event.stopPropagation(); // 부모 요소로 이벤트 전파 방지
    setButtonDummy((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="page">
      <Header side="left">검색하기</Header>
      <div className="content">
        <section>
          <Flex direction="column" gap="20px">
            {/* 검색 폼 */}
            <Flex align="center" gap="3">
              <form className={styles.search_form} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
            {/* 최근 검색어 목록 */}
            <Flex direction="column" gap="2">
              <Title>최근 검색어</Title>
              <Flex gap="10px" wrap="wrap" asChild>
                <ul>
                  <Flex gap="10px" wrap="wrap">
                    {buttonDummy.map((text, index) => (
                      <Flex align="center" wrap="wrap" gap="10px" key={`button${index}`} asChild>
                        <li onClick={() => handleTextClick(text)} className={`${styles.button} light`}>
                          {/* 검색어 텍스트 */}
                          <Text as="span" size="2" weight="bold">
                            {text}
                          </Text>
                          {/* 삭제 버튼 */}
                          <button onClick={(event) => removeItemHandler(index, event)}>
                            <Image src="/icons/ico_delete.svg" width={9} height={9} alt="삭제" />
                          </button>
                        </li>
                      </Flex>
                    ))}
                  </Flex>
                </ul>
              </Flex>
            </Flex>
          </Flex>
        </section>
      </div>
    </div>
  );
}
