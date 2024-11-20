'use client';
import { ButtonL, Toast } from '@/components/common';
import { Box, Flex, Text } from '@radix-ui/themes';
import styles from './NicknameForm.module.css';
import mypageAPI from '@/apis/mypageAPI';
import { useEffect, useState } from 'react';
import BottomButton from '../bottombutton/BootomButton';
import useToast from '@/hooks/useToast';
import { useForm } from 'react-hook-form';

export default function NicknameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedNickname, setFetchedNickname] = useState('');
  const { toast, setToast, toastMessage, showToast } = useToast();

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        setIsLoading(true);
        const fetchedNickname = await mypageAPI.getNickname();
        if (fetchedNickname) {
          console.log('Fetched nickname:', fetchedNickname);
          setFetchedNickname(fetchedNickname);
        }
      } catch (error) {
        showToast('닉네임을 가져오는데 실패했습니다.');
        setFetchedNickname('더미');
      } finally {
        setIsLoading(false);
      }
    };
    fetchNickname();
  }, [showToast]);

  const onUpdateNickname = async (data) => {
    if (data.nickname.trim() === '') {
      showToast('닉네임을 입력해주세요');
      return;
    }

    if (data.nickname.length > 13) {
      showToast('닉네임은 13자 이하로 입력해주세요');
      return;
    }

    try {
      setIsLoading(true);
      const response = await mypageAPI.updateNickname(data.nickname);
      if (response.status === 200) {
        showToast('닉네임이 성공적으로 수정되었습니다!');
        setFetchedNickname(data.nickname); // 수정된 닉네임 저장
      } else {
        throw new Error('닉네임 수정에 실패했습니다.');
      }
    } catch (error) {
      showToast('닉네임 수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="input">
      <Toast as="alert" isActive={toast} onClose={() => setToast(false)}>
        <Text>{toastMessage}</Text>
      </Toast>
      <form onSubmit={handleSubmit(onUpdateNickname)}>
        <Flex direction="column" gap="5px">
          <Text as="label" htmlFor="user_nickname" className={styles.label}>
            닉네임
          </Text>
          <Flex direction="column" gapY="20px">
            <input
              type="text"
              id="user_nickname"
              {...register('nickname', {
                required: '닉네임을 입력해주세요',
                maxLength: {
                  value: 13,
                  message: '닉네임은 13자 이하로 입력해주세요',
                },
              })}
              disabled={isLoading}
              placeholder="닉네임"
              defaultValue={fetchedNickname} // useState로 관리하는 닉네임을 defaultValue로 설정
              className={`${styles.inputField} ${errors.nickname ? styles.errorInput : ''}`}
            />
            {errors.nickname && (
              <Text as="p" className={styles.errorMessage}>
                {errors.nickname.message}
              </Text>
            )}
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
