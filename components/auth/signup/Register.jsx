'use client';

import { verifyNumber, verifyPhone, validateEmail } from '@/apis/authAPI';
import { ButtonM, Toast } from '@/components/common';
import { useToast } from '@/hooks';
import { useSignupStore } from '@/stores/authStore';
import scrollToTop from '@/utils/scrollToTop';
import { Box, Flex, Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const passwordCheck = watch('password');
  const { toast, setToast, toastMessage, showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyPhone, setIsVerifyPhone] = useState(false);
  const [isVerifyEmail, setIsVerifyEmail] = useState(false);
  const { setUserField } = useSignupStore();

  const handleVerifyNumber = async () => {
    const phoneNumber = getValues('phoneNumber');
    if (phoneNumber == '') {
      scrollToTop();
      showToast('휴대폰 번호를 입력해주세요!');
      return;
    }
    if (!/^\d{10,11}$/.test(phoneNumber)) {
      scrollToTop();
      showToast('휴대폰 번호는 10자리 또는 11자리 숫자만 입력 가능합니다!');
      return;
    }
    setIsLoading(true);
    const response = await verifyNumber(phoneNumber);
    if (response?.errorCode) {
      scrollToTop();
      showToast(response.message);
      setIsLoading(false);
      return;
    }

    alert('인증번호가 발송되었습니다! 3분 이내에 입력해주세요.');
    setIsLoading(false);
  };

  const handleVerifyPhone = async () => {
    const phoneNumber = getValues('phoneNumber');
    const verifyNumber = getValues('verifyNumber');
    if (phoneNumber == '') {
      scrollToTop();
      showToast('휴대폰 번호를 입력해주세요!');
      return;
    }
    if (!/^\d{10,11}$/.test(phoneNumber)) {
      scrollToTop();
      showToast('휴대폰 번호는 10자리 또는 11자리 숫자만 입력 가능합니다!');
      return;
    }
    if (verifyNumber == '') {
      scrollToTop();
      showToast('인증 번호를 입력해주세요!');
      return;
    }
    if (!/^\d{6}$/.test(verifyNumber)) {
      scrollToTop();
      showToast('인증번호는 6자리의 숫자만 입력 가능합니다.');
      return;
    }

    const response = await verifyPhone(phoneNumber, verifyNumber);
    if (response?.errorCode) {
      scrollToTop();
      showToast(response.message);
      return;
    }

    setIsVerifyPhone(true);
    alert('인증이 완료되었습니다!');
  };

  const handleValidateEmail = async () => {
    const email = getValues('email');
    if (email == '') {
      scrollToTop();
      showToast('이메일을 입력해주세요!');
      return;
    }
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      scrollToTop();
      showToast('유효한 이메일 주소를 입력해주세요!');
      return;
    }

    const response = await validateEmail(email);
    if (response?.errorCode) {
      scrollToTop();
      showToast(response.message);
      return;
    }

    setIsVerifyEmail(true);
    alert('사용 가능한 이메일 입니다!');
  };

  const router = useRouter();

  const handleSignupRegister = (data) => {
    if (!isVerifyPhone) {
      scrollToTop();
      showToast('핸드폰 번호 인증을 진행해주세요!');
      return;
    }
    if (!isVerifyEmail) {
      scrollToTop();
      showToast('이메일 중복검사를 진행해주세요!');
      return;
    }
    setUserField('email', data.email);
    setUserField('password', data.password);
    setUserField('name', data.name);
    setUserField('phoneNumber', data.phoneNumber);
    router.push('/service/signup/step2');
  };

  return (
    <>
      <Toast as="alert" isActive={toast} onClose={() => setToast(false)}>
        <Text>{toastMessage}</Text>
      </Toast>
      <form onSubmit={handleSubmit(handleSignupRegister)}>
        <Flex direction="column" gap="20px">
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
              <Box className={`input input_btn ${isVerifyPhone || isLoading ? 'disabled' : ''}`}>
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
                  disabled={isVerifyPhone || isLoading}
                  readOnly={isVerifyPhone || isLoading}
                />
                <button type="button" onClick={handleVerifyNumber} disabled={isLoading}>
                  {isVerifyPhone && !isLoading ? '인증완료' : '인증번호 발송'}
                </button>
              </Box>
              {errors.phoneNumber && (
                <Text as="p" className="error">
                  {errors.phoneNumber.message}
                </Text>
              )}
            </Box>
            <Box className="row">
              <Text as="label" htmlFor="verifyNumber" className="require">
                인증번호
              </Text>
              <Box className={`input input_btn ${isVerifyPhone ? 'disabled' : ''}`}>
                <input
                  type="text"
                  id="verifyNumber"
                  placeholder="숫자만 입력해주세요"
                  {...register('verifyNumber', {
                    required: '인증번호를 입력해주세요!',
                    pattern: {
                      value: /^\d{6}$/,
                      message: '인증번호는 6자리의 숫자만 입력 가능합니다.',
                    },
                  })}
                  className={errors.verifyNumber ? 'error' : ''}
                  disabled={isVerifyPhone}
                  readOnly={isVerifyPhone}
                />
                <button type="button" onClick={handleVerifyPhone}>
                  {isVerifyPhone ? '인증완료' : '인증하기'}
                </button>
              </Box>
              {errors.verifyNumber && (
                <Text as="p" className="error">
                  {errors.verifyNumber.message}
                </Text>
              )}
            </Box>
            <Box className="row">
              <Text as="label" htmlFor="email" className="require">
                이메일
              </Text>
              <Box className={`input input_btn ${isVerifyEmail ? 'disabled' : ''}`}>
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
                  disabled={isVerifyEmail}
                  readOnly={isVerifyEmail}
                />
                <button type="button" onClick={handleValidateEmail}>
                  {isVerifyEmail ? '사용가능' : '중복검사'}
                </button>
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
              <Text as="label" htmlFor="passwordCheck" className="require">
                비밀번호 확인
              </Text>
              <Box className="input">
                <input
                  type="password"
                  id="passwordCheck"
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  {...register('passwordCheck', {
                    required: '비밀번호를 다시 한 번 입력해주세요!',
                    validate: (value) => value == passwordCheck || '비밀번호가 일치하지 않습니다!',
                  })}
                  className={errors.passwordCheck ? 'error' : ''}
                />
              </Box>
              {errors.passwordCheck && (
                <Text as="p" className="error">
                  {errors.passwordCheck.message}
                </Text>
              )}
            </Box>
          </Box>
          <Box className="btn_group">
            <ButtonM rightButton={{ type: 'submit', text: '다음' }} />
          </Box>
        </Flex>
      </form>
    </>
  );
}
