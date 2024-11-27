'use client';
import { Box, Flex, Text } from '@radix-ui/themes';
import { ButtonM, Modal } from '../common';
import styles from './ProfileCardList.module.css';
import { useModal } from '@/hooks';
import Image from 'next/image';
export default function ProfileCardList({ status }) {
  const {
    isOpen: isMemberPermissionOpen,
    openModal: openMemberPermissionModal,
    closeModal: closeMemberPermissionModal,
  } = useModal();
  const {
    isOpen: isAccountPermissionOpen,
    openModal: openAccountPermissionModal,
    closeModal: closeAccountPermissionModal,
  } = useModal();
  return (
    <>
      <Modal
        isOpen={isMemberPermissionOpen}
        closeModal={closeMemberPermissionModal}
        header={{
          title: <>의 가입신청을 수락하시겠습니까?</>,
        }}
        footer={
          <ButtonM
            leftButton={{ text: '거부', onClick: closeMemberPermissionModal }}
            rightButton={{ text: '수락', onClick: closeMemberPermissionModal }}
          />
        }
      />
      <Modal
        isOpen={isAccountPermissionOpen}
        closeModal={closeAccountPermissionModal}
        header={{
          title: <>에게 통장 권한을 부여하시겠습니까?</>,
        }}
        footer={
          <ButtonM
            leftButton={{ text: '거부', onClick: closeAccountPermissionModal }}
            rightButton={{ text: '수락', onClick: closeAccountPermissionModal }}
          />
        }
      />
      <li>
        <Flex align="center" gap="20px" className={styles.card}>
          <Image src="/imgs/img_bg_profile.jpg" width={56} height={56} />
          <Box direction="column" width="199px">
            <Text as="p" weight="bold" className="underline">
              홍길동-가나다라 님ㅇㅇ
            </Text>
            <Text as="p" size="2" className="gray_t2">
              abc@naver.com
            </Text>
          </Box>
          <button
            className={`${styles.captain_btn} light`}
            onClick={status === 'member' ? openMemberPermissionModal : openAccountPermissionModal}
          >
            {status === 'member' ? '수락/거부' : '통장 권한 부여'}
          </button>
        </Flex>
      </li>
    </>
  );
}
