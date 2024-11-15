'use client';

import { Box, Text, Flex } from '@radix-ui/themes';
import styles from './ProfileCard.module.css';
import { ButtonS, Label } from '@/components/common';
import Image from 'next/image';

export default function ProfileCard({ data }) {
  const onEditClick = () => {
    alert('정보 수정 버튼이 클릭되었습니다.');
  };

  const onProfileImageClick = () => {
    alert('프로필 이미지가 클릭되었습니다.');
  };
  return (
    <Box>
      {/* 프로필 이미지 및 사용자 정보 */}
      <Flex justify="between" gap="10px">
        <Flex align="center" gap="20px">
          <div className={styles.avatarWrapper}>
            <div
              className={`${styles.profile_img} back_img`}
              style={{ backgroundImage: `url(${data.image})` }}
              onClick={onProfileImageClick}
            >
              <Image src="/imgs/img_bg_profile.jpg" width={56} height={56} alt={`${data.name} 프로필 이미지`} />
            </div>
            <button className={styles.cameraIcon} onClick={onProfileImageClick}>
              <Image src="/icons/ico_camera.svg" width={9} height={9} alt="프로필 이미지 수정" />
            </button>
          </div>
          <div className={styles.textInfo}>
            <Text as="p" size="3">
              <span className={styles.nameBoldUnderline}>{data.name}</span>
              <span className={styles.nameBold}> 님</span>
            </Text>
            <Text as="p" size="2" className={styles.gray_2}>
              {data.email}
            </Text>
          </div>
        </Flex>
        <ButtonS
          onClick={onEditClick}
          style="light"
          icon={{ src: '/icons/ico_setting.svg', width: '14', height: '14', alt: '설정' }}
        >
          정보수정
        </ButtonS>
      </Flex>
      {/* 관심사 태그 */}
      <div className={styles.tags}>
        {data.interests.length > 0 ? (
          data.interests.map((interest, id) => (
            <Label key={`interest${id}`} style="deep">
              #{interest.interest}
            </Label>
          ))
        ) : (
          <Text as="p" size="2" className={styles.gray_2}>
            관심사를 등록하면 맞춤형 모임을 추천해드려요!
          </Text>
        )}
      </div>
    </Box>
  );
}
