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

export default function SearchResult({ params }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: session } = useSession(); // 로그인 세션 확인
  const { isOpen, openModal, closeModal } = useModal(); // useModal 사용
  const router = useRouter();

  const onSubmit = async ({ keyword }) => {
    router.push(`/service/search?q=${keyword}`);
  };

  const [items, setItems] = useState([]); // 데이터 리스트
  const [page, setPage] = useState(0); // 현재 페이지를 0으로 시작
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터 여부
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // 데이터 불러오기
  const fetchData = async (currentPage) => {
    if (isLoading) return; // 이미 로딩 중이면 중복 호출 방지
    setIsLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}agits/search?keyWord=${params}&page=${currentPage}`,
        {
          headers: {
            'Cache-Control': 'no-cache',
          },
        }
      );
      const data = await response.json();

      console.log(data);

      // 데이터가 비어있어도 로딩 상태를 해제해야 함
      setHasMore(data.hasNext);

      // 중복 제거 후 데이터 추가
      setItems((prevItems) => {
        const newItems = data.data.filter(
          (newItem) =>
            !prevItems.some((prevItem) => prevItem.id === newItem.id)
        );
        return [...prevItems, ...newItems];
      });

      // 페이지 증가
      if (data.hasNext) {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('데이터 불러오기 실패:', error);
    } finally {
      setIsLoading(false); // 로딩 상태 해제
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    console.log('effect called');

    // 새로운 검색어가 들어오면 상태 초기화
    setPage(0); // 페이지 초기화
    setItems([]); // 기존 데이터 초기화
    setHasMore(true); // 더 불러올 데이터 있다고 가정
    fetchData(0); // 첫 페이지 데이터 로드
  }, [params]); // `params`가 변경되면 다시 로드

  const handleCardClick = () => {
    if (!session) {
      // 로그인이 안 된 경우 로그인 페이지로 이동
      router.push('/service/login');
    } else {
      // 로그인이 된 경우 모달을 열기
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
                <Image
                  src="/icons/ico_search.svg"
                  width={15}
                  height={15}
                  alt="검색하기"
                />
              </button>
            </form>
            <div className="result_list">
              <InfiniteScroll
                dataLength={items.length}
                next={() => fetchData(page)}
                hasMore={hasMore}
                loader={isLoading && <h4>Loading...</h4>} // 로딩 상태 확인
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
                        <ImageCard as='button' data={agit} onClick={handleCardClick}></ImageCard>
                      </li>
                    ))}
                  </ul>
                </Flex>
              </InfiniteScroll>
            </div>
          </Flex>
        </section>
      </div>

      {/* 모달 */}
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
