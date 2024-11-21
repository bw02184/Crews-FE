'use client';

import { ButtonL, ImageCard, Modal, SelectFilter, TabMenu, Title } from '@/components/common';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';
import { tabMenuList } from '@/constants/tabMenuList/service';
import { Box, Flex, Text } from '@radix-ui/themes';
import Image from 'next/image';
import styles from './page.module.css';
import { agits } from '@/constants/dummy';
import useModal from '@/hooks/useModal';
import Link from 'next/link';
import ApplyModalContent from '@/components/agits/ApplyModalContent';
import { Suspense } from 'react';

export default function Service() {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        header={{ title: '모임명 모임명', text: '아지트에 가입하시려면 아래 사항을 확인해주세요.' }}
        footer={<ButtonL style="deep">가입신청</ButtonL>}
      >
        <ApplyModalContent />
      </Modal>
      <div className="page">
        <header>
          <Box className={styles.header_top}>
            <SelectFilter isHeader={true} selectList={agitsSelectMenuList}>
              {agitsSelectMenuList[0].text}
            </SelectFilter>
            <Link href="/service/payment">
              <Image src="/icons/ico_payment.svg" width={18} height={18} alt="결제하기" />
            </Link>
          </Box>
          <Suspense>
            <TabMenu as="button" tabMenuList={tabMenuList} />
          </Suspense>
        </header>
        <Flex direction="column" gap="10px" className="content">
          <section>
            <Flex direction="column" gap="20px">
              <Box className={styles.main_visual}>
                <Flex justify="end" align="center" className={styles.title}>
                  <h1>크루즈</h1>
                </Flex>
                <div className={styles.hashtag}>
                  <ul>
                    <li className={styles.tag_1}>#ㅇㅇ</li>
                    <li className={styles.tag_2}>#ㄴㄴ</li>
                    <li className={styles.tag_3}>#뭔가소개멘트</li>
                  </ul>
                </div>
              </Box>
              <Box>
                <div className={styles.sec_tit}>
                  <Title>모집 마감 임박</Title>
                  <Text as="p" size="2" weight="light">
                    어쩌고 저쩌고 메뉴설명
                  </Text>
                </div>
                <Box className={styles.sec_con} mt="15px">
                  <Flex direction="column" gap="10px">
                    {agits.map((agit, i) => {
                      return <ImageCard as="button" data={agit} key={`agit${i}`} onClick={openModal}></ImageCard>;
                    })}
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </section>
          <section>
            <div className={styles.sec_tit}>
              <Title>모집 마감 임박</Title>
              <Text as="p" size="2" weight="light">
                어쩌고 저쩌고 메뉴설명
              </Text>
            </div>
            <Box className={styles.sec_con} mt="15px">
              <Flex direction="column" gap="10px">
                {agits.map((agit, i) => {
                  return <ImageCard as="button" data={agit} key={`agit${i}`} onClick={openModal}></ImageCard>;
                })}
              </Flex>
            </Box>
          </section>
        </Flex>
      </div>
    </>
  );
}
