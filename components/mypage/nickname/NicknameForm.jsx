'use client';

import { ButtonL, Toast } from '@/components/common';
import { Box, Flex, Text } from '@radix-ui/themes';
import styles from './NicknameForm.module.css';
import instance from '@/apis/instance';
import { useEffect, useState } from 'react';
import BottomButton from '../bottombutton/BootomButton';

export default function NicknameForm(data) {
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isToastActive, setIsToastActive] = useState(false);

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        setIsLoading(true);
        const response = await instance.get('/members/me/nickname');
        setNickname(response.data.nickname);
      } catch (error) {
        console.error('닉네임 가져오기에 실패했습니다:', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNickname();
  }, []);

  const onUpdateNickname = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지

    if (nickname.trim() === '') {
      setIsToastActive(true);
      return;
    }

    try {
      setIsLoading(true);
      const response = await instance.post('/members/me/nickname', {
        nickname: nickname,
      });
      if (response.status === 200) {
        alert('닉네임이 성공적으로 수정되었습니다!');
      } else {
        throw new Error('닉네임 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('닉네임 수정에 실패했습니다:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="input">
      <Toast
        children="닉네임을 입력해주세요!"
        as="error"
        isActive={isToastActive}
        onClose={() => setIsToastActive(false)}
        autoClose={2000}
      ></Toast>
      <form onSubmit={onUpdateNickname}>
        <Flex direction="column" gap="5px">
          <Text as="label" htmlFor="user_nickname" className={styles.label}>
            닉네임
          </Text>
          <Flex direction="column" gapY="20px">
            <input
              type="text"
              id="user_nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={isLoading}
              placeholder="닉네임"
              className={styles.inputField}
            />
            <ButtonL type="submit" style="deep" disabled={isLoading}>
              {isLoading ? '처리 중...' : '수정'}
            </ButtonL>
          </Flex>
        </Flex>
        <BottomButton />
      </form>
    </Box>
  );
}
