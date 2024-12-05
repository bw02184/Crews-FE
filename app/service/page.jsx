'use client';

import { ButtonL, ImageCard, Modal, TabMenu, Title, Toast } from '@/components/common';
import { tabMenuList } from '@/constants/tabMenuList/service';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import ApplyModalContent from '@/components/agits/ApplyModalContent';
import { Suspense, useEffect, useState } from 'react';
import { useModal, useToast } from '@/hooks';
import useSWR from 'swr';
import { getAgits, getRecruitNewAgits } from '@/apis/agitsAPI';
import { useSearchParams } from 'next/navigation';
import ImageCardSkeleton from '@/components/common/Skeleton/ImageCardSkeleton';

export default function Service() {
  const { isOpen, openModal, closeModal } = useModal();
  const { toast, setToast, toastMessage, showToast } = useToast();
  const { data: recruitNewAgits, isLoading: recruitNewLoading } = useSWR(
    `agits/home`,
    async () => await getRecruitNewAgits(),
  );

  if (recruitNewAgits?.errorCode) {
    showToast(recruitNewAgits.message);
  }

  const [id, setId] = useState(3);
  const [page, setPage] = useState(0);
  const {
    data: cateAgits,
    isLoading: cateLoading,
    mutate: cateMutate,
  } = useSWR(`agits?subject-id=${id}&page=${page}`, async () => await getAgits(id, page));
  if (cateAgits?.errorCode) {
    showToast(cateAgits.message);
  }
  const searchParams = useSearchParams();
  useEffect(() => {
    const searchId = searchParams?.get('id');
    if (searchId && searchId !== id) {
      setId(searchId);
    }
  }, [searchParams, id]);

  useEffect(() => {
    if (id !== undefined && page !== undefined) {
      cateMutate();
      console.log(cateAgits);
    }
  }, [id, page]);

  return (
    <Suspense>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        header={{ title: '모임명 모임명', text: '아지트에 가입하시려면 아래 사항을 확인해주세요.' }}
        footer={<ButtonL style="deep">가입신청</ButtonL>}
      >
        <ApplyModalContent />
      </Modal>
      <Toast
        as="alert"
        isActive={toast}
        onClose={() => {
          setToast(false);
        }}
      >
        {toastMessage}
      </Toast>
      <div className="page">
        <header>
          <Flex justify="between" align="center" className={styles.header_top}>
            <Heading as="h1">CREWS</Heading>
            <Link href="/service/payment">
              <Image src="/icons/ico_payment.svg" width={18} height={18} alt="결제하기" />
            </Link>
          </Flex>
          <TabMenu as="button" tabMenuList={tabMenuList} />
        </header>
        <Flex direction="column" gap="10px" className="content">
          {searchParams.size <= 0 && (
            <>
              <section>
                <Flex direction="column" gap="20px">
                  <Box className={styles.main_visual}>
                    <Flex justify="end" align="center" className={styles.title}>
                      <h1>크루즈</h1>
                    </Flex>
                    <div className={styles.hashtag}>
                      <ul>
                        <li className={styles.tag_1}>#소모임</li>
                        <li className={styles.tag_2}>#모임통장</li>
                        <li className={styles.tag_3}>#통합서비스</li>
                      </ul>
                    </div>
                  </Box>
                  <Box>
                    <div className={styles.sec_tit}>
                      <Title>모집 마감 임박</Title>
                      <Text as="p" size="2" weight="light">
                        곧 정원이 마감되는 아지트에 가입해보세요!
                      </Text>
                    </div>
                    <Box className={styles.sec_con} mt="15px">
                      <Flex direction="column" gap="10px">
                        {recruitNewLoading
                          ? [0, 1, 2].map((_, i) => {
                              return <ImageCardSkeleton key={`recruitSkeleton${i}`} />;
                            })
                          : recruitNewAgits?.recruitList.map((agit, i) => {
                              return (
                                <ImageCard as="button" data={agit} key={`agit${i}`} onClick={openModal}></ImageCard>
                              );
                            })}
                      </Flex>
                    </Box>
                  </Box>
                </Flex>
              </section>
              <section>
                <div className={styles.sec_tit}>
                  <Title>신규 아지트</Title>
                  <Text as="p" size="2" weight="light">
                    방금 새로 개설된 아지트를 살펴보세요!
                  </Text>
                </div>
                <Box className={styles.sec_con} mt="15px">
                  <Flex direction="column" gap="10px">
                    {recruitNewLoading
                      ? [3, 4, 5].map((_, i) => {
                          return <ImageCardSkeleton key={`newSkeleton${i}`} />;
                        })
                      : recruitNewAgits?.newAgitList.map((agit, i) => {
                          return <ImageCard as="button" data={agit} key={`agit${i}`} onClick={openModal}></ImageCard>;
                        })}
                  </Flex>
                </Box>
              </section>
            </>
          )}
        </Flex>
      </div>
    </Suspense>
  );
}
