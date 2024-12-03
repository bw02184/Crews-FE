'use client';
import { Box, Text, Flex } from '@radix-ui/themes';
import styles from './ProfileCard.module.css';
import { ButtonS, Label, Dropdown } from '@/components/common';
import Image from 'next/image';
import useSWR, { mutate } from 'swr';
import { EXCLUDED_INTEREST_IDS } from '@/constants/excludedIds';
import { useNicknameStore } from '@/stores/mypageStore';
import { useEffect } from 'react';
import { deleteProfileImage, updateProfileImage } from '@/apis/mypageAPI';
import { useRouter } from 'next/navigation';

export default function ProfileCard({ profileData }) {
  const { data } = useSWR('members/me/profile', () => getProfile(), {
    fallbackData: profileData,
  });
  const { nickname, setNickname } = useNicknameStore();
  const router = useRouter();
  useEffect(() => {
    if (data?.nickname && data.nickname !== nickname) {
      setNickname(data.nickname);
    }
  }, [data?.nickname, setNickname, nickname]);

  const filteredInterests = (data?.interests || []).filter(
    (interest) => !EXCLUDED_INTEREST_IDS.includes(interest.interestingId),
  );

  const onEditPhotoClick = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/png, image/jpeg';
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        alert('지원하지 않는 파일 형식입니다. png 또는 jpg 이미지만 업로드할 수 있습니다.');
        return;
      }

      try {
        const folder = 'profiles';
        const response = await fetch('/api/s3', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileType: file.type, folder }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`파일 업로드 중 오류가 발생했습니다: ${errorText}`);
        }
        const { signedUrl, fileName } = await response.json();
        const uploadResponse = await fetch(signedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
          },
          body: file,
        });

        if (!uploadResponse.ok) {
          throw new Error('S3 파일 업로드 중 오류가 발생했습니다.');
        }

        const updateRespons = await updateProfileImage({ profileImagePath: fileName });
        if (updateRespons?.errorCode) {
          alert(updateRespons.message);
        } else {
          console.log('업로드된 파일 이름:', fileName);
          await mutate('members/me/profile', undefined, { revalidate: true });
          alert('사진이 등록 되었습니다.');
          router.push('/service/mypage');
        }
      } catch (error) {
        console.error('사진 업로드 중 오류:', error);
        alert(error.message);
      }
    };

    fileInput.click();
  };

  const onDeletePhotoClick = async () => {
    try {
      const fileName = data.profileImage;
      const folder = 'profiles';
      console.log(fileName);

      if (!fileName) {
        throw new Error('삭제할 파일명이 없습니다.');
      }

      const response = await fetch('/api/s3', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, folder }),
      });

      if (!response.ok) {
        throw new Error('사진 삭제 중 오류가 발생했습니다.');
      }

      const updateRespons = await deleteProfileImage();
      if (updateRespons?.errorCode) {
        alert(updateRespons.message);
      } else {
        await mutate('members/me/profile', undefined, { revalidate: true });
        alert('사진이 삭제되었습니다.');
      }
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
              style={{ backgroundImage: `url(https://djogyo1sj025q.cloudfront.net/${data.profileImage})` }}
            >
              <Image src="/imgs/img_bg_profile.jpg" width={56} height={56} alt={`${data.profileImage} 프로필 이미지`} />
            </div>
            <div className={styles.dropdown}>
              <Dropdown
                menuList={[
                  {
                    text: '사진 수정하기',
                    onClick: () => {
                      onEditPhotoClick();
                      document.activeElement.blur();
                    },
                  },
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
