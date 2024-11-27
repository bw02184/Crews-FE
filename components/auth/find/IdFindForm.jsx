'use client';

import { Box, Callout, Flex, Text } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { ButtonL, Toast } from '@/components/common';
import { idFind } from '@/apis/authAPI';
import { useToast } from '@/hooks';
import { useState } from 'react';
import IdFindResult from './IdFindResult';

export default function IdFindForm() {
  const [isCorrect, setIsCorrect] = useState(false);
  const [result, setResult] = useState({ name: '', email: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toast, setToast, toastMessage, showToast } = useToast();

  const handleFindId = async ({ name, phoneNumber }) => {
    const response = await idFind(name, phoneNumber);

    if (response?.errorCode) {
      console.log(`아이디 찾기 실패: ${response.message}`);
      showToast(response.message);
    } else {
      setIsCorrect(true);
      setResult({ name, email: response.email });
    }
  };
  return !isCorrect ? (
    <>
      <Toast as="alert" isActive={toast} onClose={() => setToast(false)} autoClose={1500}>
        <Text>{toastMessage}</Text>
      </Toast>
      <form onSubmit={handleSubmit(handleFindId)}>
        <Flex direction="column" gap="20px">
          <Callout.Root>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>이름과 휴대폰 번호를 입력하고 인증해주세요!</Callout.Text>
          </Callout.Root>
          <Box className="form_group">
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
            <ButtonL type="submit" style="deep">
              아이디 찾기
            </ButtonL>
          </Box>
        </Flex>
      </form>
    </>
  ) : (
    <IdFindResult result={result} />
  );
}
