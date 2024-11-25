'use client';

import { ButtonM } from '@/components/common';
import { Box, Flex, Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const passwordCheck = watch('password');

  const router = useRouter();
  const onSubmit = (data) => {
    console.log(data);
    router.push('/service/signup/step2');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="20px">
        <Box className="form_group">
          <Box className="row">
            <Text as="label" htmlFor="user_id" className="require">
              이름
            </Text>
            <Box className="input">
              <input
                type="text"
                id="user_name"
                placeholder="이름을 입력해주세요"
                {...register('user_name', {
                  required: '이름을 입력해주세요!',
                  pattern: {
                    value: /^[A-Za-z가-힣]/,
                    message: '한글 또는 영문만 입력 가능합니다',
                  },
                })}
                className={errors.user_name ? 'error' : ''}
              />
            </Box>
            {errors.user_name && (
              <Text as="p" className="error">
                {errors.user_name.message}
              </Text>
            )}
          </Box>
          <Box className="row">
            <Text as="label" htmlFor="user_mobile" className="require">
              휴대폰 번호
            </Text>
            <Box className="input input_btn">
              <input
                type="text"
                id="user_mobile"
                placeholder="숫자만 입력해주세요"
                {...register('user_mobile', {
                  required: '휴대폰 번호를 입력해주세요!',
                  pattern: {
                    value: /^\d{10,11}$/,
                    message: '휴대폰 번호는 10자리 또는 11자리 숫자만 입력 가능합니다.',
                  },
                })}
                className={errors.user_mobile ? 'error' : ''}
              />
              <button>인증번호 발송</button>
            </Box>
            {errors.user_mobile && (
              <Text as="p" className="error">
                {errors.user_mobile.message}
              </Text>
            )}
          </Box>
          <Box className="row">
            <Text as="label" htmlFor="user_certifi" className="require">
              인증번호
            </Text>
            <Box className="input input_btn">
              <input
                type="text"
                id="user_certifi"
                placeholder="숫자만 입력해주세요"
                {...register('user_certifi', {
                  required: '인증번호를 입력해주세요!',
                })}
                className={errors.user_certifi ? 'error' : ''}
              />
              <button>인증하기</button>
            </Box>
            {errors.user_certifi && (
              <Text as="p" className="error">
                {errors.user_certifi.message}
              </Text>
            )}
          </Box>
          <Box className="row">
            <Text as="label" htmlFor="email" className="require">
              이메일
            </Text>
            <Box className="input input_btn">
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
              <button>중복검사</button>
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
          <Box className="row">
            <Text as="label" htmlFor="password_check" className="require">
              비밀번호 확인
            </Text>
            <Box className="input">
              <input
                type="password"
                id="password_check"
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                {...register('password_check', {
                  required: '비밀번호를 다시 한 번 입력해주세요!',
                  validate: (value) => value == passwordCheck || '비밀번호가 일치하지 않습니다!',
                })}
                className={errors.password_check ? 'error' : ''}
              />
            </Box>
            {errors.password_check && (
              <Text as="p" className="error">
                {errors.password_check.message}
              </Text>
            )}
          </Box>
        </Box>
        <Box className="btn_group">
          <ButtonM rightButton={{ type: 'submit', text: '다음' }} />
        </Box>
      </Flex>
    </form>
  );
}
