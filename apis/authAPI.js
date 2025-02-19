'use server';

import instance from './instance';
import { signIn } from '@/auth';
import { BASE_URL } from '@/constants/auth';
import { AuthError } from 'next-auth';

// 로그인
export const login = async ({ email, password }) => {
  const response = await instance.post('members/login', {
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (response?.error) {
    throw new Error(`Failed to SignIn [${response.error}]`);
  }

  const accessToken = response.headers.get('access');
  const cookie = response.headers.get('Set-Cookie');
  const refreshToken = cookie?.split(';')[0].split('=')[1];

  return { accessToken, refreshToken };
};

export const credentialSignIn = async (email, password) => {
  try {
    await signIn('credentials', { email, password });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: 'Invalid credentials',
          };
        default:
          return {
            message: 'Something went wrong.',
          };
      }
    }
    throw error;
  }
};

// 토큰 갱신
export const reissueToken = async (refresh_token) => {
  const response = await fetch(`${BASE_URL}members/reissue`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refresh=${refresh_token}`,
    },
    method: 'POST',
  });

  if (!response.ok) {
    console.error('Token Expired');
    return await response.json();
  }

  const accessToken = response.headers.get('access');
  const cookie = response.headers.get('Set-Cookie');
  const refreshToken = cookie?.split(';')[0].split('=')[1];

  return { accessToken, refreshToken };
};

// 로그아웃
export const logout = async () => {
  const response = await instance.post('members/logout', {
    credentials: 'include',
  });

  return response;
};

// 아이디 찾기
export const idFind = async (name, phoneNumber) => {
  const response = await instance.post('members/find-id', {
    body: JSON.stringify({ name, phoneNumber }),
  });

  return response;
};

// 비밀번호 찾기
export const pwFind = async (email, name, phoneNumber) => {
  const response = await instance.post('members/find-pw', {
    body: JSON.stringify({ email, name, phoneNumber }),
  });

  return response;
};

// 인증번호 요청
export const verifyNumber = async (phoneNumber) => {
  const response = await instance.post('members/verify-number', {
    body: JSON.stringify({ phoneNumber }),
  });

  return response;
};

// 인증번호 검증
export const verifyPhone = async (phoneNumber, verifyNumber) => {
  const response = await instance.post('members/verify-phone', {
    body: JSON.stringify({ phoneNumber, verifyNumber }),
  });

  return response;
};

// 이메일 중복확인
export const validateEmail = async (email) => {
  const response = await instance.post('members/signup/validate-email', {
    body: JSON.stringify({ email }),
  });

  return response;
};

// 회원가입
export const signUp = async (
  email,
  password,
  name,
  phoneNumber,
  profileImage,
  addressDo,
  addressSi,
  addressGuGun,
  addressDong,
  pinNumber,
) => {
  const response = await instance.post('members/signup', {
    body: JSON.stringify({
      email,
      password,
      name,
      phoneNumber,
      profileImage,
      addressDo,
      addressSi,
      addressGuGun,
      addressDong,
      pinNumber,
    }),
  });

  return response;
};
