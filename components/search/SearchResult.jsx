'use client';

import { Flex, Text } from '@radix-ui/themes';
import { Header, ImageCard, Modal } from '@/components/common';
import styles from '@/components/search/SearchResult.module.css';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@/constants/auth';
import ApplyModalContent from '@/components/agits/ApplyModalContent';
import { useSession } from 'next-auth/react';
import useModal from '@/hooks/useModal';
import ButtonL from '@/components/common/Button/ButtonL';
import useSWR from 'swr';
import { searchAgits } from '@/apis/searchAPI';


export default function SearchResult({ params }) {
  const [items, setItems] = useState([]); // 데이터 리스트
  const [page, setPage] = useState(0); // 현재 페이지를 0으로 시작
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터 여부
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: session } = useSession(); // 로그인 세션 확인
  const { isOpen, openModal, closeModal } = useModal(); // useModal 사용
  const router = useRouter();

  const { data, error, mutate } = useSWR(
    params && page >= 0 ? `${BASE_URL}agits/search?keyWord=${params}&page=${page}` : null,
    async () => {
      const response = await searchAgits(params, page);
      setIsLoading(true);
      setHasMore(response.hasNext);

      setItems((prevItems) => {
        // 중복 제거 로직 추가
        const newItems = response.data.filter(
          (newItem) => !prevItems.some((prevItem) => prevItem.id === newItem.id)
        );
        return [...prevItems, ...newItems];
      });

      setIsLoading(false);
      return response;
    }
  );
  const handleUpdatePage = (currentPage) => {
    if (hasMore) {
      setPage(currentPage + 1);
    }
  }
  const onSubmit = async ({ keyword }) => {
    router.push(`/service/search?q=${keyword}`);
    setPage(0);
    setItems([]);
    setHasMore(true);
  };

  useEffect(() => {
    setPage(0);
    setItems([]);
    setHasMore(true);
    mutate();
  }, [params, mutate]);

  const handleCardClick = () => {
    if (!session) {
      router.push('/service/login');
    } else {
      openModal();
    }
  };

  return (
    <>
      <Header side="left">검색결과</Header>
      <div className="content">
        <section>
          <Flex direction="column" gap="20px">
            <form onSubmit={handleSubmit(onSubmit)} className={styles.search_form}>
              <input
                {...register('keyword')}
                type="text"
                id="keyword"
                placeholder="키워드를 입력해주세요!"
                defaultValue={params}
              />
              <button type="submit">
                <Image src="/icons/ico_search.svg" width={15} height={15} alt="검색하기" />
              </button>
            </form>
            <div className="result_list">
              <InfiniteScroll
                dataLength={items.length}
                next={() => handleUpdatePage(page)}
                hasMore={hasMore}
                loader={isLoading && <h4>Loading...</h4>}
                endMessage={
                  <Text as="p" align="center">
                    더 이상 불러올 데이터가 없습니다.
                  </Text>
                }
              >
                <Flex direction="column" gap="10px" asChild>
                  <ul>
                    {items.map((agit, i) => (
                      <li key={`agit${i}`}>
                        <div onClick={handleCardClick}>
                          <ImageCard data={agit}></ImageCard>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Flex>
              </InfiniteScroll>
            </div>
          </Flex>
        </section>
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          header={{
            title: '모임명 모임명',
            text: '아지트에 가입하시려면 아래 사항을 확인해주세요.',
          }}
          footer={<ButtonL style="deep">가입신청</ButtonL>}
        >
          <ApplyModalContent />
        </Modal>
      )}
    </>
  );
}
