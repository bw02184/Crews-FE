'use client';

import { ButtonL, ButtonM, Title, Modal, PinNumber, Toast } from '@/components/common';
import CardInfo from '@/components/payment/CardInfo';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import styles from './PaymentMain.module.css';
import { useState, useEffect, Suspense, useRef } from 'react';
import Image from 'next/image';
import { useModal, useToast } from '@/hooks';
import { useNavVisible } from '@/hooks/useNavVisible';
import { getQRCode, getPaymentResult, requestAccountAuthority } from '@/apis/paymentAPI';
import { useRouter } from 'next/navigation';

export default function PaymentMain({ paymentData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [agitInfo, setAgitInfo] = useState({ name: '', cardName: '', cardCode: '', agitRole: false, qrCode: '' });
  const [paymentActivation, setPaymentActivation] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: pinIsOpen, openModal: pinOpenModal, closeModal: pinCloseModal } = useModal();
  const [timeLeft, setTimeLeft] = useState(5);
  const timeLeftRef = useRef(5); // useRef는 컴포넌트 최상위에서 선언
  const router = useRouter();
  const { toast, setToast, toastMessage, showToast } = useToast();

  useNavVisible(false);

  useEffect(() => {
    let timer;

    // 항상 최신 timeLeft 값을 참조
    timeLeftRef.current = timeLeft;

    if (paymentActivation) {
      timer = setInterval(async () => {
        // timeLeft 감소 로직
        if (timeLeftRef.current > 0) {
          setTimeLeft((prev) => {
            timeLeftRef.current = prev - 1; // 최신 값 업데이트
            return prev - 1;
          });
        } else {
          setPaymentActivation(false);
          clearInterval(timer);
          setTimeLeft(5); // 타이머 초기화
        }

        const response = await getPaymentResult(paymentData[activeIndex].agitId);
        if (response?.data !== null) {
          setPaymentActivation(false);
          clearInterval(timer);
          setTimeLeft(5); // 타이머 초기화
        }
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer); // 기존 타이머 정리
    };
  }, [paymentActivation, activeIndex, paymentData]);

  useEffect(() => {
    const currentCard = paymentData[activeIndex];
    if (currentCard && (currentCard.agitRole === 'LEADER' || currentCard.agitRole === 'STAFF')) {
      setAgitInfo({
        name: currentCard.name,
        cardName: currentCard.cardName,
        cardCode: currentCard.cardCode,
        agitRole: true,
        qrCode: '',
        pinNumber: '',
      });
    } else if ((currentCard && currentCard.agitRole === 'MEMBER') || currentCard.agitRole === 'ADVENCED') {
      setAgitInfo({
        name: currentCard.name,
        cardName: currentCard.cardName,
        cardCode: currentCard.cardCode,
        agitRole: false,
        qrCode: '',
        pinNumber: '',
      });
    }
  }, [activeIndex]);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleClickPayment = async (response) => {
    // const response = await getQRCode();
    setAgitInfo({ ...agitInfo, qrCode: response.qrCode, pinNumber: response.pinNumber });
    setPaymentActivation(true);
    setTimeLeft(5); // 타이머 초기화
    closeModal(); // 모달 닫기
  };

  const handleClickReset = async () => {
    if (timeLeft === 0) {
      // 시간이 초과된 경우 타이머를 다시 초기화\
      const response = await getQRCode({ agitId: paymentData[activeIndex].agitId, pinNumber: agitInfo.pinNumber });
      setAgitInfo({ ...agitInfo, qrCode: response.qrCode });
      setTimeLeft(5);
      setPaymentActivation(true); // 결제 활성화 상태 유지
    } else {
      // 결제 취소
      setAgitInfo({ ...agitInfo, qrCode: '' });
      setPaymentActivation(false);
      setTimeLeft(5); // 타이머 초기화
      setActiveIndex(0);
    }
  };

  const handleModal = () => {
    closeModal();
    pinOpenModal();
  };

  const handleCreateCard = () => {
    router.push(`/service/agits/${agitInfo.agitId}`);
  };

  const handleAccountAuthority = async () => {
    await requestAccountAuthority(paymentData[activeIndex].agitId);
    closeModal();
    showToast('모임통장 권한이 요청되었습니다.');
  };

  return (
    <>
      <Toast
        as="info"
        isActive={toast}
        onClose={() => {
          setToast(false);
        }}
      >
        {toastMessage}
      </Toast>
      <Modal
        isOpen={pinIsOpen}
        closeModal={pinCloseModal}
        header={{
          title: (
            <>
              <span className="underline">PIN번호를 인증</span>해 주세요.
            </>
          ),
          text: '정확히 일치해야 합니다.',
        }}
      >
        <Suspense>
          <PinNumber
            defaultStage={'auth'}
            defaultStatus={'payment'}
            data={paymentData[activeIndex].agitId}
            callback={handleClickPayment}
            closeModal={pinCloseModal}
          />
        </Suspense>
      </Modal>
      {agitInfo.agitRole && paymentData[activeIndex].cardName !== '' ? (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          header={{ title: agitInfo.name, text: '해당 모임이 맞는지 확인해주세요.\n ' }}
          footer={
            <ButtonM
              leftButton={{ onClick: closeModal, text: '취소' }}
              rightButton={{ onClick: handleModal, text: '결제' }}
            />
          }
        />
      ) : agitInfo.agitRole && paymentData[activeIndex].cardName === '' ? (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          header={{
            title: agitInfo.name,
            text: '해당 아지트에 개설된 모임 통장으로 발급받은 카드가 없습니다. 카드를 발급하시겠습니까?',
          }}
          footer={
            <ButtonM
              leftButton={{ onClick: closeModal, text: '취소' }}
              rightButton={{ onClick: handleCreateCard, text: '발급' }}
            />
          }
        />
      ) : (
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          header={{
            title: agitInfo.name,
            text: '해당 아지트에 개설된 모임 통장 권한이 없습니다. 출금 및 결제 권한을 요청할까요?',
          }}
          footer={
            <ButtonM
              leftButton={{ onClick: closeModal, text: '취소' }}
              rightButton={{ onClick: handleAccountAuthority, text: '요청' }}
            />
          }
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
                          <Image src={agitInfo.qrCode} width={125} height={125} alt="QR 코드" />
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
                    {paymentData.map((card, index) => (
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
                          <Image src={`${card.src}`} width={190} height={300} alt={`카드 이미지`} priority />
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
              ) : paymentData[activeIndex].cardName !== '' ? (
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
