'use client';

import { Box, Text, Flex } from '@radix-ui/themes';
import styles from './ProfileCard.module.css';
import { ButtonS, Label, Dropdown } from '@/components/common';
import Image from 'next/image';
import useSWR, { mutate } from 'swr';
import { EXCLUDED_INTEREST_IDS } from '@/constants/excludedIds';
import { useNicknameStore } from '@/stores/mypageStore';
import { useEffect } from 'react';
import instance from '@/apis/instance';

export default function ProfileCard({ profileData }) {
  const { data } = useSWR('members/me/profile', () => instance.get('members/me/profile'), {
    fallbackData: profileData,
  });
  const { nickname, setNickname } = useNicknameStore();

  useEffect(() => {
    if (data?.nickname && data.nickname !== nickname) {
      setNickname(data.nickname);
    }
  }, [data?.nickname, setNickname, nickname]);

  const filteredInterests = (data?.interests || []).filter(
    (interest) => !EXCLUDED_INTEREST_IDS.includes(interest.interestingId),
  );

  const onEditPhotoClick = async () => {
    alert(`사진 수정하기가 클릭되었습니다. ${process.env.AWS_ACCESS_KEY_ID}`);
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const fileName = `${Date.now()}_${file.name}`;
      try {
        const response = await fetch('/api/s3', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName,
            fileType: file.type,
          }),
        });

        if (!response.ok) throw new Error('업로드 URL 생성 중 오류가 발생했습니다.');

        const { signedUrl } = await response.json();

        // S3에 파일 업로드
        await fetch(signedUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type },
        });

        alert('사진이 업로드되었습니다.');
        await mutate('members/me/profile');
      } catch (error) {
        console.error('사진 업로드 중 오류:', error);
        alert(error.message);
      }
    };

    fileInput.click();
  };

  const onDeletePhotoClick = async () => {
    alert('사진 삭제하기가 클릭되었습니다.');
    try {
      const fileName = data.profileImage.split('/').pop(); // URL에서 파일명 추출

      const response = await fetch('/api/s3', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName }),
      });

      if (!response.ok) throw new Error('사진 삭제 중 오류가 발생했습니다.');

      alert('사진이 삭제되었습니다.');
      await mutate('members/me/profile');
    } catch (error) {
      console.error('사진 삭제 중 오류:', error);
      alert(error.message);
    }
  };

  return (
    <Flex direction="column" gap="20px" className={styles.user_profile}>
      <div className={styles.top}>
        <Flex align="center" gap="20px" className={styles.top}>
          <div className={styles.img_box}>
            <div
              className={`${styles.profile_img} back_img ${data.profileImage == (null || '') ? styles.blank : ''}`}
              style={{ backgroundImage: `url(${data.profileImage})` }}
            >
              <Image src="/imgs/img_bg_profile.jpg" width={56} height={56} alt={`${data.profileImage} 프로필 이미지`} />
            </div>
            <div className={styles.dropdown}>
              <Dropdown
                menuList={[
                  { text: '사진 수정하기', onClick: onEditPhotoClick },
                  { text: '사진 삭제하기', onClick: onDeletePhotoClick },
                ]}
              >
                <button className={styles.btn_camera}>
                  <Image src="/icons/ico_camera.svg" width={9} height={9} alt="프로필 이미지 수정" />
                </button>
              </Dropdown>
            </div>
          </div>
          <div className={styles.txt_box}>
            <strong>
              <Text as="p" size="3">
                <span className="underline">{data.nickname}</span>님
              </Text>
            </strong>
            <Text as="p" size="2" className="gray_t2">
              {data.email}
            </Text>
          </div>
        </Flex>
        <Box className={styles.btn_setting}>
          <Dropdown
            side="right"
            as="link"
            menuList={[
              { text: '닉네임 수정', href: '/service/mypage/nickname' },
              { text: '관심사 수정', href: '/service/mypage/interest' },
              { text: '활동지역 수정', href: '/service/mypage/address' },
              { text: '비밀번호 수정', href: '/service/mypage/password' },
              { text: 'PIN번호 수정', href: '/service/mypage/pinNumber' },
            ]}
          >
            <ButtonS style="light" icon={{ src: '/icons/ico_setting.svg', width: '14', height: '14', alt: '설정' }}>
              설정
            </ButtonS>
          </Dropdown>
        </Box>
      </div>
      <div className={styles.btm}>
        <div className={styles.tag_list}>
          {filteredInterests.length > 0 ? (
            <Flex wrap="wrap" gap="10px" asChild>
              <ul>
                {filteredInterests.map((interest, i) => (
                  <li key={`interest${i}`}>
                    <Label style="deep">#{interest.name || 'Unknown'}</Label>
                  </li>
                ))}
              </ul>
            </Flex>
          ) : (
            <Text as="p" size="2" className="gray_t2">
              관심사를 등록하면 맞춤형 모임을 추천해드려요!
            </Text>
          )}
        </div>
      </div>
    </Flex>
  );
}
