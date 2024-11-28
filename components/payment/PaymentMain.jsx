'use client';

import { ButtonL, ButtonM, Title, Modal } from '@/components/common';
import CardInfo from '@/components/payment/CardInfo';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import styles from './PaymentMain.module.css';
import { useState, useEffect } from 'react';
import { cardLists } from '@/constants/dummy';
import Image from 'next/image';
import useModal from '@/hooks/useModal';
import { useNavVisible } from '@/hooks/useNavVisible';

export default function PaymentMain() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [agitInfo, setAgitInfo] = useState({ name: '', cardName: '', cardCode: '', agitRole: false });
  const [paymentActivation, setPaymentActivation] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const [timeLeft, setTimeLeft] = useState(10);
  useNavVisible(false);
  // 타이머 동작 로직
  useEffect(() => {
    let timer;
    if (paymentActivation) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [paymentActivation]);

  useEffect(() => {
    const currentCard = cardLists[activeIndex];
    if (currentCard) {
      setAgitInfo({
        name: currentCard.name,
        cardName: currentCard.cardName,
        cardCode: currentCard.cardCode,
        agitRole: currentCard.agitRole,
      });
    }
  }, [activeIndex]);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleClickPayment = () => {
    setPaymentActivation(true);
    setTimeLeft(10); // 타이머 초기화
    closeModal(); // 모달 닫기
  };

  const handleClickReset = () => {
    if (timeLeft === 0) {
      // 시간이 초과된 경우 타이머를 다시 초기화
      setTimeLeft(10);
      setPaymentActivation(true); // 결제 활성화 상태 유지
    } else {
      // 결제 취소
      setPaymentActivation(false);
      setTimeLeft(10); // 타이머 초기화
      setActiveIndex(0);
    }
  };

  return (
    <>
      {agitInfo.agitRole == true && cardLists[activeIndex].cardName !== '' ? (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          header={{ title: agitInfo.name, text: '해당 모임이 맞는지 확인해주세요.\n ' }}
          footer={
            <ButtonM
              leftButton={{ onClick: closeModal, text: '취소' }}
              rightButton={{ onClick: handleClickPayment, text: '결제' }}
            />
          }
        />
      ) : agitInfo.agitRole === true && cardLists[activeIndex].cardName === '' ? (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          header={{
            title: agitInfo.name,
            text: (
              <>
                해당 아지트에 개설된 모임 통장으로 발급받은 카드가 없습니다. <i className="dpb"></i> 카드를
                발급하시겠습니까?
              </>
            ),
          }}
          footer={<ButtonM leftButton={{ onClick: closeModal, text: '취소' }} rightButton={{ text: '발급' }} />}
        />
      ) : (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          header={{
            title: agitInfo.name,
            text: (
              <>
                해당 아지트에 개설된 모임 통장 권한이 없습니다. <i className="dpb"></i> 출금 및 결제 권한을 요청할까요?
              </>
            ),
          }}
          footer={<ButtonM leftButton={{ onClick: closeModal, text: '취소' }} rightButton={{ text: '요청' }} />}
        />
      )}

      <Box direction="column" className="content">
        <Flex direction="column" gap="20px" asChild>
          <section>
            <Title>{agitInfo.name} 아지트</Title>
            <Flex direction="column" gap="20px" asChild align="center">
              <Box>
                <CardInfo cardName={agitInfo.cardName} cardCode={agitInfo.cardCode}></CardInfo>
                {paymentActivation ? (
                  <Card>
                    <Flex direction="column" align="center" gap="10px">
                      {timeLeft > 0 ? <Title>결제 활성화</Title> : <Title>결제 비활성화</Title>}
                      <Box>
                        {timeLeft > 0 ? (
                          <Image src="/icons/ico_qr.svg" width={125} height={125} alt="QR 코드" />
                        ) : (
                          <Image src="/imgs/img_bg_bank.jpg" width={125} height={125} alt="QR 코드" />
                        )}
                      </Box>

                      <Box className={styles.textAlign}>
                        <Text as="p" weight="bold" size="5" align="center">
                          {timeLeft > 0 ? `0:${timeLeft.toString().padStart(2, '0')}` : '시간 초과'}
                        </Text>
                        <Text as="span" weight="medium" size="2" align="center" className="gray_t1">
                          {timeLeft > 0
                            ? '시간 내에 QR코드로 결제를 진행해주세요.'
                            : '다시 시도하려면 새로고침 버튼을 눌러주세요.'}
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                ) : (
                  <Swiper
                    effect="cards"
                    grabCursor={true}
                    modules={[EffectCards]}
                    className={styles.swiper}
                    onSlideChange={handleSlideChange}
                  >
                    {cardLists.map((card, index) => (
                      <SwiperSlide
                        key={`card${index}`}
                        className={`${styles.swiperCardSlide} ${card.cardName == '' && styles.swiperAppendSlide}`}
                      >
                        {card.cardName === '' ? (
                          <Box>
                            <Image
                              src={`/icons/ico_blank_plus.svg`}
                              width={32}
                              height={32}
                              alt={`카드 추가 아이콘`}
                              className={styles.plusIcon}
                            />
                          </Box>
                        ) : (
                          <Image src={`/imgs/${card.src}`} width={190} height={300} alt={`카드 이미지`} priority />
                        )}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </Box>
            </Flex>
            <Box>
              {timeLeft === 0 ? (
                <ButtonL style="deep" onClick={handleClickReset}>
                  다시 시도
                </ButtonL>
              ) : paymentActivation ? (
                <ButtonL style="deep" onClick={handleClickReset}>
                  취소하기
                </ButtonL>
              ) : cardLists[activeIndex].cardName !== '' ? (
                <ButtonL style="deep" onClick={openModal}>
                  결제하기
                </ButtonL>
              ) : (
                <ButtonL style="deep" onClick={openModal}>
                  카드 연결하기
                </ButtonL>
              )}
            </Box>
          </section>
        </Flex>
      </Box>
    </>
  );
}
