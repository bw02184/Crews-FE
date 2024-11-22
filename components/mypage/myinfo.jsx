'use client';

import { ButtonL, Toast } from '@/components/common';
import { Box, Flex, Text } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import useToast from '@/hooks/useToast';
import mypageAPI from '@/apis/mypageAPI';
import BottomButton from '@/components/mypage/bottombutton/BootomButton';
import { useState } from 'react';

export default function MyInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
  });
  const { toast, setToast, toastMessage, showToast } = useToast();
  const newPassword = watch('new_password');
  const onUpdatePassword = async ({ current_password, new_password }) => {
    try {
      const response = await mypageAPI.updatePassword(current_password, new_password);
      if (response) {
        showToast('비밀번호가 성공적으로 수정되었습니다!');
        reset();
      }
    } catch (error) {
      console.error('비밀번호 수정에 실패했습니다:', error.message);
      showToast('비밀번호 수정에 실패했습니다');
    }
  };

  return (
    <Box className="input">
      <Toast as="alert" isActive={toast} onClose={() => setToast(false)}>
        <Text>{toastMessage}</Text>
      </Toast>
      <form onSubmit={handleSubmit(onUpdatePassword)}>
        <Flex direction="column" gap="10px">
          <Box className="row">
            <Text as="label" htmlFor="current_password" className="require">
              현재 비밀번호
            </Text>
            <Box className="input">
              <input
                type="password"
                id="current_password"
                placeholder="현재 비밀번호를 입력해주세요"
                {...register('current_password', {
                  required: '현재 비밀번호를 입력해주세요',
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                    message: '특수문자(!@#$%^&*) 포함 영문, 숫자 8자리 이상',
                  },
                })}
                className={`${errors.current_password ? 'error' : ''}`}
              />
            </Box>
            {errors.current_password && (
              <Text as="p" className="error">
                {errors.current_password.message}
              </Text>
            )}
          </Box>

          <Box className="row">
            <Text as="label" htmlFor="new_password" className="require">
              새 비밀번호
            </Text>
            <Box className="input">
              <input
                type="password"
                id="new_password"
                placeholder="변경할 비밀번호를 입력해주세요"
                {...register('new_password', {
                  required: '새 비밀번호를 입력해주세요',
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                    message: '특수문자(!@#$%^&*) 포함 영문, 숫자 8자리 이상',
                  },
                })}
                className={`${errors.new_password ? 'error' : ''}`}
              />
            </Box>
            {errors.new_password && (
              <Text as="p" className="error">
                {errors.new_password.message}
              </Text>
            )}
          </Box>

          <Box className="row">
            <Text as="label" htmlFor="confirm_password" className="require">
              새 비밀번호 확인
            </Text>
            <Box className="input">
              <input
                type="password"
                id="confirm_password"
                placeholder="변경할 비밀번호를 다시 한 번 입력해주세요"
                {...register('confirm_password', {
                  required: '비밀번호 확인을 입력해주세요',
                  validate: (value) => value === newPassword || '비밀번호가 일치하지 않습니다',
                })}
                className={`${errors.confirm_password ? 'error' : ''}`}
              />
            </Box>
            {errors.confirm_password && (
              <Text as="p" className="error">
                {errors.confirm_password.message}
              </Text>
            )}
          </Box>

          <ButtonL type="submit" style="deep">
            수정하기
          </ButtonL>
        </Flex>
      </form>
      <BottomButton />
    </Box>
  );
}
