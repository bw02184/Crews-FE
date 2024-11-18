'use client';

import Link from 'next/link';
import { Box, Flex, Text } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { ButtonL } from '@/components/common';
import { credentialSignIn } from '@/apis/authAPI';
import { useSession } from 'next-auth/react';

export default function LoginForm() {
  const { data: session, update } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    const response = await credentialSignIn(email, password);
    if (typeof response === 'object' && response.message) {
      alert('로그인에 실패했습니다.');
      reset();
    } else {
      alert('로그인에 성공했습니다!');
      update();
      reset();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="20px">
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
            <Text as="label" htmlFor="password" className="require">
              비밀번호
            </Text>
            <Box className="input">
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요"
                {...register('password', {
                  required: '비밀번호를 입력해주세요!',
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                    message: '특수문자(!@#$%^&*) 포함 영문, 숫자 8자리 이상',
                  },
                })}
                className={errors.password ? 'error' : ''}
              />
            </Box>
            {errors.password && (
              <Text as="p" className="error">
                {errors.password.message}
              </Text>
            )}
          </Box>
        </Box>
        <Box className="btn_group">
          <ButtonL type="submit" style="deep">
            로그인
          </ButtonL>
          <div className="btm_util">
            <Flex justify="center" align="center" gap="20px" asChild>
              <ul>
                <li>
                  <Link href="idfind">아이디 찾기</Link>
                </li>
                <li>
                  <Link href="pwfind">비밀번호 찾기</Link>
                </li>
                <li>
                  <Link href="signup/step1">회원가입</Link>
                </li>
              </ul>
            </Flex>
          </div>
        </Box>
      </Flex>
    </form>
  );
}
