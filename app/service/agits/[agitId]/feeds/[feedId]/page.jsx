'use client';
import { ButtonM, Header, Modal, Toast } from '@/components/common';
import { Box, Flex, Text } from '@radix-ui/themes';
import styles from './page.module.css';
import { useState } from 'react';
import { useModal, useToast } from '@/hooks';
import { useForm } from 'react-hook-form';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';

export default function Page({ params }) {
  const [agits] = agitsSelectMenuList.filter((select) => select.id == params.agitId);
  const [isLiked, setIsLiked] = useState(false);
  const handleDelete = () => {
    console.log('삭제');
  };
  const { isOpen, openModal, closeModal } = useModal();
  const { toast, setToast, toastMessage, showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ report }) => {
    closeModal();
    showToast('신고가 완료되었습니다!');
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        header={{ title: '해당 활동기록을 신고하시겠습니까?' }}
        footer={
          <ButtonM
            leftButton={{ text: '취소', onClick: closeModal }}
            rightButton={{ text: '신고하기', onClick: handleSubmit(onSubmit) }}
          />
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.report_box}>
          <Box className="row">
            <Text as="label" className="require">
              신고사유
            </Text>
            <Box className="input">
              <input
                id="report"
                type="text"
                placeholder="신고 사유를 적어주세요"
                {...register('report', {
                  required: '신고 사유를 적어주세요',
                  maxLength: {
                    value: 25,
                    message: '최대 25자까지만 입력할 수 있습니다.',
                  },
                })}
                className={errors.report ? 'error' : ''}
              />
            </Box>
            {errors.report && (
              <Text as="p" className="error">
                {errors.report.message}
              </Text>
            )}
          </Box>
        </form>
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
        <Header side="center">활동 기록</Header>
        <Box className="content">
          <section>
            <Flex direction="column" gap="20px">
              <Box className="img_box">
                <div className="img">
                  <img src="/dev/img_introduce.jpg" />
                </div>
              </Box>
              <Flex direction="column" gap="10px">
                <Flex justify="between" align="center" wrap="wrap" className={styles.info}>
                  <em>2024.11.07</em>
                  <b className="gray_t1">홍길동</b>
                </Flex>
                <Text as="p" size="1" weight="medium" className="gray_t1">
                  이러쿵저러쿵요러쿵좋았던내용이러쿵저러쿵요러쿵좋았던내용이러쿵저러쿵요러쿵좋았던내용이러쿵저러쿵요러쿵좋았던내용이러쿵저러쿵요러쿵좋았던내용이러쿵저러쿵요러쿵좋았던내용이러쿵저러쿵요러쿵좋았던내용이러쿵저러쿵요러쿵좋았던내용이러쿵저러쿵요러쿵좋았던내용...
                </Text>
                <Flex justify="between" gap="10px">
                  <button className={`${styles.report_btn} red`} onClick={openModal}>
                    신고하기
                  </button>
                  <Flex justify="between" gap="5px" className={styles.like_count}>
                    <button
                      onClick={(e) => {
                        console.log(e.target);
                        setIsLiked(!isLiked);
                      }}
                    >
                      {isLiked ? (
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M0 4.75923C0 8.71394 3.21554 10.8214 5.56938 12.7077C6.4 13.3733 7.2 14 8 14C8.8 14 9.6 13.3733 10.4306 12.7077C12.7845 10.8214 16 8.71394 16 4.75923C16 0.804497 11.5998 -2.00012 8 1.80191C4.40013 -2.00012 0 0.804497 0 4.75923Z"
                            fill="#CE292E"
                          />
                        </svg>
                      ) : (
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 2.21894L8.40216 2.60799C8.29693 2.71788 8.15174 2.77996 8 2.77996C7.84826 2.77996 7.70307 2.71788 7.59784 2.60799L8 2.21894ZM9.9155 11.8097C11.0434 10.9159 12.2768 10.0431 13.2552 8.93566C14.2145 7.84982 14.8837 6.58287 14.8837 4.93914H16C16 6.93303 15.1736 8.45415 14.0899 9.6807C13.0253 10.8856 11.6683 11.8496 10.6066 12.6909L9.9155 11.8097ZM14.8837 4.93914C14.8837 3.33022 13.9793 1.98098 12.7447 1.41373C11.5453 0.862641 9.93365 1.00858 8.40216 2.60799L7.59784 1.82989C9.41507 -0.067883 11.5244 -0.380658 13.2087 0.393235C14.8579 1.15096 16 2.91042 16 4.93914H14.8837ZM10.6066 12.6909C10.2254 12.9929 9.81616 13.315 9.40145 13.5586C8.98687 13.8021 8.51379 14 8 14V12.8779C8.2304 12.8779 8.50151 12.7877 8.83825 12.5898C9.17485 12.3921 9.52403 12.1199 9.9155 11.8097L10.6066 12.6909ZM5.39341 12.6909C4.33176 11.8496 2.97466 10.8856 1.9101 9.6807C0.826419 8.45415 0 6.93303 0 4.93914H1.11628C1.11628 6.58287 1.78545 7.84982 2.74478 8.93566C3.72324 10.0431 4.95658 10.9159 6.08447 11.8097L5.39341 12.6909ZM0 4.93914C0 2.91042 1.1421 1.15096 2.79129 0.393235C4.47561 -0.380658 6.58493 -0.067883 8.40216 1.82989L7.59784 2.60799C6.06638 1.00858 4.45477 0.862641 3.25537 1.41373C2.02076 1.98098 1.11628 3.33022 1.11628 4.93914H0ZM6.08447 11.8097C6.47598 12.1199 6.82515 12.3921 7.16175 12.5898C7.49849 12.7877 7.7696 12.8779 8 12.8779V14C7.48621 14 7.01313 13.8021 6.59855 13.5586C6.18381 13.315 5.77466 12.9929 5.39341 12.6909L6.08447 11.8097Z"
                            fill="#CE292E"
                          />
                        </svg>
                      )}
                    </button>
                    <Text as="p" size="1" weight="medium" className="red">
                      13
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <ButtonM
                leftButton={{ as: 'link', href: `/service/agits/${agits?.id}/feeds/1/edit`, text: '수정' }}
                rightButton={{ onClick: handleDelete, text: '삭제' }}
              />
            </Flex>
          </section>
        </Box>
      </div>
    </>
  );
}
