'use client';

import { ButtonS, Modal, Title } from '@/components/common';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import styles from './MyAccount.module.css';
import Image from 'next/image';
import useModal from '@/hooks/useModal';
import AssetList from './AssetList';

export default function MyAccount() {
  const { isOpen: isDetachOpen, openModal: openDetachModal, closeModal: closeDetachModal } = useModal();
  const { isOpen: isAttachOpen, openModal: openAttachModal, closeModal: closeAttachModal } = useModal();

  return (
    <Flex direction="column" gap="20px">
      <Title>내 통장</Title>
      <Swiper slidesPerView={'auto'} spaceBetween={20} className={`swiper ${styles.swiper}`}>
        <SwiperSlide>
          <Card>
            <Flex align="center" gap="10px">
              <Box className={styles.img_box}>
                <Box className={`${styles.img} back_img`} style={{ backgroundImage: `url(/dev/img_bank.jpg)` }}>
                  <Image src="/imgs/img_bg_bank.jpg" width={36} height={36} alt={`카드 이미지`} />
                </Box>
              </Box>
              <Box className={styles.txt_box}>
                <Flex gap="15px">
                  <Text as="p" size="1" weight="medium">
                    KB국민ONE통장
                  </Text>
                  <Text as="p" size="1" weight="medium">
                    110467158676
                  </Text>
                </Flex>
                <b>{(339760).toLocaleString('ko-KR')}원</b>
              </Box>
            </Flex>
          </Card>
          <Flex direction="column" gap="10px" className={styles.btn_box} pt="1">
            <Text as="p" size="2" weight="medium">
              임시 모임명
            </Text>
            <ButtonS style="light" onClick={openDetachModal}>
              해지하기
            </ButtonS>
          </Flex>
        </SwiperSlide>
        <SwiperSlide className={styles.blank}>
          <Card className="card_link">
            <button onClick={openAttachModal} className={styles.linkButton}>
              <Flex align="center" gap="10px">
                <Box className={styles.img_box}>
                  <Box
                    className={`${styles.img} back_img`}
                    style={{ backgroundImage: `url(/icons/ico_blank_plus.svg)` }}
                  >
                    <Image src="/imgs/img_bg_bank.jpg" width={36} height={36} alt={`계좌 연결하기`} />
                  </Box>
                </Box>
                <Box className={styles.txt_box}>
                  <Text as="p" size="2" weight="medium">
                    개인 계좌를 연결하고 <i className="dpb"></i>
                    어쩌고저쩌고...해보세요.
                  </Text>
                </Box>
              </Flex>
            </button>
          </Card>
        </SwiperSlide>
      </Swiper>
      {/* Modals */}
      <Modal
        isOpen={isDetachOpen}
        closeModal={closeDetachModal}
        header={{
          title: (
            <>
              연결된 개인 계좌를
              <br />
              삭제 하시겠습니까?
            </>
          ),
        }}
      />
      <Modal
        isOpen={isAttachOpen}
        closeModal={closeAttachModal}
        header={{
          title: `자산 연결`,
          text: `마이데이터를 불러옵니다.`,
        }}
      >
        {/* 모달 내부 컨텐츠 */}
        <Flex direction="column" gap="3">
          <AssetList />
        </Flex>
      </Modal>
    </Flex>
  );
}
