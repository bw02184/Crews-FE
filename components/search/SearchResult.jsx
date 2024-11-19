'use client';

import { Flex } from '@radix-ui/themes';
import { Header, ImageCard, SelectFilter } from '../common';
import styles from '@/components/search/SearchResult.module.css';
import {
  searchMenu,
  sortSelectDateList,
  sortSelectNameList,
  sortSelectPersonList,
} from '@/constants/selectMenuList/searchMenuList';
import Image from 'next/image';
import { agits } from '@/constants/dummy';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function SearchResult({ params }) {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async ({ keyword }) => {
    // if (title.length < 5) {
    // showToast('제목을 길게 입력해주세요! 아무튼 토스트 테스트!');
    //   return;
    // }

    // const response = await postPosts(title, content);

    // if (response?.error) {
    //   alert(response.error);
    // } else {
    //   alert('게시물이 저장되었습니다!');
    //   reset();
    router.push(`/service/search?q=${keyword}`);

    //   // 'posts' 키와 일치하는 SWR 캐시 갱신
    //   mutate('posts');
    // }
  };

  return (
    <div className="page">
      <Header side="left">검색결과</Header>
      <div className="content">
        <section>
          <Flex direction="column" gap="20px">
            <Flex align="center" gap="3px" asChild>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.search_form}>
                <SelectFilter filter="keyword" selectList={searchMenu}>
                  모임명
                </SelectFilter>
                <input
                  {...register('keyword')}
                  defaultValue={params}
                  type="text"
                  id="search_input"
                />
                <button type="submit">
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
