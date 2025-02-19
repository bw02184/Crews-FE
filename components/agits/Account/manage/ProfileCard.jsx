'use client';

import { Text, Flex } from '@radix-ui/themes';
import styles from './ProfileCard.module.css';
import Image from 'next/image';
import useSWR from 'swr';
import instance from '@/apis/instance';
import { callDues } from '@/apis/agitsAPI';
import { useState } from 'react';
import { CDN_URL } from '@/constants/auth';

export default function ProfileCard({ agitId, commonDues, profileData, yearAndMonth }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCall = async () => {
    const duesData = {
      memberId: [profileData.memberId],
      duesAmount: commonDues?.dueAmount,
      year: yearAndMonth?.year,
      month: yearAndMonth?.month,
    };

    const response = await callDues(agitId, duesData);

    if (response?.errorCode) {
      console.log(response.message);
      alert('에러가 발생했습니다. 다시 실행 해 주세요.');
    } else if (response) {
      setIsDisabled(true);
      alert('문자가 발송되었습니다.');
    }
  };

  return (
    <li className={styles.profile}>
      <Flex justify="between" align="center" gap="10px">
        <Flex align="center" gap="20px">
          <div className={styles.img_box}>
            <div
              className={`${styles.profile_img} back_img ${profileData.image == null ? styles.blank : ''}`}
              style={{
                backgroundImage: `url(${profileData.image == null || profileData.image == '' ? '/imgs/img_bg_profile.jpg' : CDN_URL + profileData.image})`,
              }}
            >
              <Image src="/imgs/img_bg_profile.jpg" width={56} height={56} alt={`${profileData.image} 프로필 이미지`} />
            </div>
          </div>
          <div className={styles.txt_box}>
            <strong>
              <Text as="p" size="3">
                <span className="underline">
                  {profileData.name} · {profileData.nickName}
                </span>
                <span> 님</span>
              </Text>
            </strong>
            <Text as="p" size="2" className="gray_t2">
              {profileData.email}
            </Text>
          </div>
        </Flex>
        <button className={`${styles.btn_submit} red`} onClick={handleCall} disabled={isDisabled}>
          납부 요청
        </button>
      </Flex>
    </li>
  );
}
