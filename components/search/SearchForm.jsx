'use client';

import { Flex, Text } from '@radix-ui/themes';
import { Header, SelectFilter, Title } from '@/components/common';
import { searchMenu } from '@/constants/selectMenuList/searchMenuList';
import Image from 'next/image';
import { useState } from 'react';
import styles from '@/components/search/SearchForm.module.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async ({ keyword }) => {
    router.push(`/service/search?q=${keyword}`);
  };

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

  const handleTextClick = (text) => {
    setValue('keyword', text);
  };

  const handleRemoveItem = (index) => {
    setButtonDummy((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="page">
      <Header side="left">검색하기</Header>
      <div className="content">
        <section>
          <Flex direction="column" gap="20px">
            <Flex align="center" gap="3" asChild>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.search_form}>
                <SelectFilter filter="keyword" selectList={searchMenu}>
                  모임명
                </SelectFilter>
                <input
                  {...register('keyword')}
                  type="text"
                  id="search_input"
                  placeholder="키워드를 입력해주세요!"
                  autoFocus
                />
                <button type="submit">
                  <Image src="/icons/ico_search.svg" width={15} height={15} alt="검색하기" />
                </button>
              </form>
            </Flex>
            <Flex direction="column" gap="2">
              <Title>최근 검색어</Title>
              <Flex gap="10px" wrap="wrap" asChild>
                <ul>
                  <Flex gap="10px" wrap="wrap">
                    {buttonDummy.map((text, i) => (
                      <Flex align="center" wrap="wrap" gap="10px" key={`button${i}`} asChild>
                        <li onClick={() => handleTextClick(text)} className={`${styles.button} light`}>
                          <Text as="span" size="2" weight="bold">
                            {text}
                          </Text>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveItem(i);
                            }}
                          >
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
