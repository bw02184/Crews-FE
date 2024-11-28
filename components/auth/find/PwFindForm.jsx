'use client';

import { Box, Callout, Flex, Text } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { ButtonL, Toast } from '@/components/common';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useToast } from '@/hooks';
import { pwFind } from '@/apis/authAPI';
import PwFindResult from './PwFindResult';

export default function PwFindForm() {
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toast, setToast, toastMessage, showToast } = useToast();

  const handleFindPw = async ({ email, name, phoneNumber }) => {
    setIsLoading(true);
    const response = await pwFind(email, name, phoneNumber);

    if (response?.errorCode) {
      console.log(`비밀번호 찾기 실패: ${response.message}`);
      showToast(response.message);
      setIsLoading(false);
    } else {
      setIsCorrect(true);
    }
  };
  return !isCorrect ? (
    <>
      <Toast as="alert" isActive={toast} onClose={() => setToast(false)} autoClose={1500}>
        <Text>{toastMessage}</Text>
      </Toast>
      <form onSubmit={handleSubmit(handleFindPw)}>
        <Flex direction="column" gap="20px">
          <Callout.Root>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>가입 시 기입한 개인정보를 입력하고 인증해주세요!</Callout.Text>
          </Callout.Root>
          <Box className="form_group">
            <Box className="row">
              <Text as="label" htmlFor="email" className="require">
                이메일
              </Text>
              <Box className="input">
                <input
                  type="email"
                  id="email"
                  placeholder="이메일을 입력해주세요"
                  {...register('email', {
                    required: '이메일을 입력해주세요!',
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: '유효한 이메일 주소를 입력해주세요.',
                    },
                  })}
                  className={errors.email ? 'error' : ''}
                />
              </Box>
              {errors.email && (
                <Text as="p" className="error">
                  {errors.email.message}
                </Text>
              )}
            </Box>
            <Box className="row">
              <Text as="label" htmlFor="name" className="require">
                이름
              </Text>
              <Box className="input">
                <input
                  type="text"
                  id="name"
                  placeholder="이름을 입력해주세요"
                  {...register('name', {
                    required: '이름을 입력해주세요!',
                    pattern: {
                      value: /^[A-Za-z가-힣]/,
                      message: '한글 또는 영문만 입력 가능합니다',
                    },
                  })}
                  className={errors.name ? 'error' : ''}
                />
              </Box>
              {errors.name && (
                <Text as="p" className="error">
                  {errors.name.message}
                </Text>
              )}
            </Box>
            <Box className="row">
              <Text as="label" htmlFor="phoneNumber" className="require">
                휴대폰 번호
              </Text>
              <Box className="input">
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="숫자만 입력해주세요"
                  {...register('phoneNumber', {
                    required: '휴대폰 번호를 입력해주세요!',
                    pattern: {
                      value: /^\d{10,11}$/,
                      message: '휴대폰 번호는 10자리 또는 11자리 숫자만 입력 가능합니다.',
                    },
                  })}
                  className={errors.phoneNumber ? 'error' : ''}
                />
              </Box>
              {errors.phoneNumber && (
                <Text as="p" className="error">
                  {errors.phoneNumber.message}
                </Text>
              )}
            </Box>
          </Box>
          <Box className="btn_group">
            <ButtonL type="submit" style="deep" disabled={isLoading}>
              {isLoading ? '찾는 중...' : '비밀번호 찾기'}
            </ButtonL>
          </Box>
        </Flex>
      </form>
    </>
  ) : (
    <PwFindResult />
  );
}
