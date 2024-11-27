'use client';

import { Text, Flex } from '@radix-ui/themes';
import styles from './ProfileCard.module.css';
import Image from 'next/image';
import useSWR from 'swr';
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

  return (
    <li className={styles.profile}>
      <Flex direction="column" gap="20px" className={styles.user_profile}>
        <div className={styles.top}>
          <Flex justify="between" align="center" gap="10px" className={styles.top}>
            <Flex align="center" gap="20px">
              <div className={styles.img_box}>
                <div
                  className={`${styles.profile_img} back_img ${data.profileImage == null ? styles.blank : ''}`}
                  style={{ backgroundImage: `url(${data.profileImage})` }}
                >
                  <Image
                    src="/imgs/img_bg_profile.jpg"
                    width={56}
                    height={56}
                    alt={`${data.profileImage} 프로필 이미지`}
                  />
                </div>
              </div>
              <div className={styles.txt_box}>
                <strong>
                  <Text as="p" size="3">
                    <span className="underline">
                      {data.name} · {data.nickname}
                    </span>
                    <span> 님</span>
                  </Text>
                </strong>
                <Text as="p" size="2" className="gray_t2">
                  {data.email}
                </Text>
              </div>
            </Flex>
            <button className={styles.btn_submit}>납부 요청</button>
          </Flex>
        </div>
      </Flex>
    </li>
  );
}
