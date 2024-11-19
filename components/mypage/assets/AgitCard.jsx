'use client';
import { ButtonS, Modal, Title } from '@/components/common';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import styles from './AgitCard.module.css';
import Image from 'next/image';
import useModal from '@/hooks/useModal';

export default function AgitCard() {
  const { isOpen: isDetachOpen, openModal: openDetachModal, closeModal: closeDetachModal } = useModal();
  const { isOpen: isAttachOpen, openModal: openAttachModal, closeModal: closeAttachModal } = useModal();

  return (
    <Flex direction="column" gap="20px">
      <Title>모임카드</Title>
      <Swiper slidesPerView={'auto'} spaceBetween={20} className={`swiper ${styles.swiper}`}>
        <SwiperSlide>
          <Card>
            <Flex align="center" gap="10px">
              <Box className={styles.img_box}>
                <Box className="back_img" style={{ backgroundImage: `url(/dev/img_asset_card.jpg)` }}>
                  <Image src="/imgs/img_bg_asset_card.jpg" width={47} height={73} alt={`카드 이미지`} />
                </Box>
              </Box>
              <Box className={styles.txt_box}>
                <Text as="p" size="2" weight="medium">
                  신한카드 Deep Dream Platinum+
                </Text>
                <Text as="span" size="1" weight="medium">
                  본인 <b>국내</b> 3475
                </Text>
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
          <Card>
            <Flex align="center" gap="10px">
              <Box className={styles.img_box}>
                <Box className="back_img" style={{ backgroundImage: `url(/imgs/img_bg_asset_card.jpg)` }}>
                  <Image src="/imgs/img_bg_asset_card.jpg" width={47} height={73} alt={`카드 이미지`} />
                </Box>
              </Box>
              <Box className={styles.txt_box}>
                <Text as="p" size="2" weight="medium">
                  아직 연결된 카드가 없습니다. <i className="dpb"></i>
                  카드를 연결해주세요.
                </Text>
              </Box>
            </Flex>
          </Card>
          <Flex direction="column" gap="10px" className={styles.btn_box} pt="1">
            <Text as="p" size="2" weight="medium">
              임시 모임명
            </Text>
            <ButtonS style="light" onClick={openAttachModal}>
              연결하기
            </ButtonS>
          </Flex>
        </SwiperSlide>
      </Swiper>
      {/* Modals */}
      <Modal
        isOpen={isDetachOpen}
        closeModal={closeDetachModal}
        header={{
          title: (
            <>
              모임카드를
              <br />
              해지 하시겠습니까?
            </>
          ),
        }}
      />
      <Modal
        isOpen={isAttachOpen}
        closeModal={closeAttachModal}
        header={{
          title: (
            <>
              모임카드를
              <br />
              연결 하시겠습니까?
            </>
          ),
        }}
      />
    </Flex>
  );
}
