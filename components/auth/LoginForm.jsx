'use client';

import Link from 'next/link';
import styles from './LoginForm.module.css';
import { Box, Flex, Text } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { ButtonL } from '@/components/common';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="20px">
        <Box className="form_group">
          <Box className="row">
            <Text as="label" htmlFor="user_id" className="require">
              이메일
            </Text>
            <Box className="input">
              <input
                type="email"
                id="user_id"
                placeholder="이메일을 입력해주세요"
                {...register('user_id', {
                  required: '이메일을 입력해주세요!',
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: '유효한 이메일 주소를 입력해주세요.',
                  },
                })}
                className={errors.user_id ? 'error' : ''}
              />
            </Box>
            {errors.user_id && (
              <Text as="p" className="error">
                {errors.user_id.message}
              </Text>
            )}
          </Box>
          <Box className="row">
            <Text as="label" htmlFor="user_pw" className="require">
              비밀번호
            </Text>
            <Box className="input">
              <input
                type="password"
                id="user_pw"
                placeholder="비밀번호를 입력해주세요!"
                {...register('user_pw', {
                  required: '비밀번호를 입력해주세요!',
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                    message: '특수문자(!@#$%^&*) 포함 영문, 숫자 8자리 이상',
                  },
                })}
                className={errors.user_pw ? 'error' : ''}
              />
            </Box>
            {errors.user_pw && (
              <Text as="p" className="error">
                {errors.user_pw.message}
              </Text>
            )}
          </Box>
        </Box>
        <Box className="btn_group">
          <ButtonL type="submit" style="deep">
            로그인
          </ButtonL>
          <div className={styles.find_list}>
            <Flex justify="center" align="center" gap="20px" mt="1" asChild>
              <ul>
                <li>
                  <Link href="/service/idfind">
                    <Text as="p" size="1" weight="medium">
                      아이디 찾기
                    </Text>
                  </Link>
                </li>
                <li>
                  <Link href="/service/pwfind">
                    <Text as="p" size="1" weight="medium">
                      비밀번호 찾기
                    </Text>
                  </Link>
                </li>
                <li>
                  <Link href="/service/signup">
                    <Text as="p" size="1" weight="medium">
                      회원가입
                    </Text>
                  </Link>
                </li>
              </ul>
            </Flex>
          </div>
        </Box>
      </Flex>
    </form>
  );
}
