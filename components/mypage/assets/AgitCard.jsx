'use client';
import { ButtonM, ButtonS, Modal, Title } from '@/components/common';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import styles from './AgitCard.module.css';
import Image from 'next/image';
import { useModal } from '@/hooks';
const cardData = [
  {
    id: 1,
    img: '/dev/img_asset_card.jpg',
    cardName: '신한카드 Deep Dream Platinum+',
    cardNumber: '3475',
    crewName: 'FISA 모임',
  },
  {
    id: 2,
    img: '/dev/img_asset_card.jpg',
    cardName: '우리카드 My Wise',
    cardNumber: '8832',
    crewName: '동아리 모임',
  },
  {
    id: 3,
    img: '/dev/img_asset_card.jpg',
    cardName: '토스카드 TossCard',
    cardNumber: '1132',
    crewName: '사격 모임',
  },
];

export default function AgitCard() {
  const { isOpen: isDetachOpen, openModal: openDetachModal, closeModal: closeDetachModal } = useModal();
  const { isOpen: isAttachOpen, openModal: openAttachModal, closeModal: closeAttachModal } = useModal();

  return (
    <Flex direction="column" gap="20px">
      <Title>모임카드</Title>
      <Swiper slidesPerView={'auto'} spaceBetween={20} className={`swiper ${styles.swiper}`}>
        {cardData.map((card, i) => (
          <SwiperSlide key={`slide${i}`}>
            <Card>
              <Flex align="center" gap="10px">
                <Box className={styles.img_box}>
                  <Box className="back_img" style={{ backgroundImage: `url(${card.img})` }}>
                    <Image src={card.img} width={47} height={73} alt={`카드 이미지`} />
                  </Box>
                </Box>
                <Box className={styles.txt_box}>
                  <Text as="p" size="2" weight="medium">
                    {card.cardName}
                  </Text>
                  <Text as="span" size="1" weight="medium">
                    {card.cardNumber}
                  </Text>
                </Box>
              </Flex>
            </Card>
            <Flex direction="column" gap="10px" className={styles.btn_box} pt="1">
              <Text as="p" size="2" weight="medium">
                {card.crewName}
              </Text>
              <ButtonS style="light" onClick={openDetachModal}>
                해지하기
              </ButtonS>
            </Flex>
          </SwiperSlide>
        ))}
        <SwiperSlide className={styles.blank}>
          <Card className="card_link">
            <button onClick={openAttachModal} className={styles.linkButton}>
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
            </button>
          </Card>
        </SwiperSlide>
      </Swiper>
      <Modal
        isOpen={isDetachOpen}
        closeModal={closeDetachModal}
        header={{
          title: (
            <>
              모임카드를 <i className="dpb"></i>
              해지 하시겠습니까?
            </>
          ),
        }}
        footer={
          <ButtonM
            leftButton={{ text: '취소', onClick: closeDetachModal }}
            rightButton={{ text: '해지', onClick: closeDetachModal }}
          />
        }
      />
      <Modal
        isOpen={isAttachOpen}
        closeModal={closeAttachModal}
        header={{
          title: (
            <>
              모임카드를 <i className="dpb"></i>
              연결 하시겠습니까?
            </>
          ),
        }}
        footer={
          <ButtonM
            leftButton={{ text: '취소', onClick: closeAttachModal }}
            rightButton={{ text: '연결', onClick: closeAttachModal }}
          />
        }
      />
    </Flex>
  );
}
