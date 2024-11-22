'use server';
import { revalidatePath } from 'next/cache';
import instance from './instance';
// 닉네임 가져오기
export const getNickname = async () => {
  const response = await instance.get('members/me/nickname');
  return response;
};

// 닉네임 수정
export const updateNickname = async (nickname) => {
  const response = await instance.put('members/me/nickname', {
    body: JSON.stringify({ nickname }),
  });
  revalidatePath('/service/mypage');
  return response;
};

// 프로필 정보 조회
export const getProfile = async () => {
  const response = await instance.get('members/me/profile');
  return response;
};

// 프로필 이미지 업데이트
export const updateProfileImage = async (formData) => {
  const response = await instance.put('members/me/profile/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

// 전체 관심사 목록 조회
export const getAllInterests = async () => {
  const response = await instance.get('interests');
  return response;
};

// 회원 관심사 목록 조회
export const getInterests = async () => {
  const response = await instance.get('members/me/interests');
  return response;
};

// 사용자 관심사 업데이트
export const updateInterests = async (selectedInterests) => {
  const payload = {
    interests: selectedInterests.map((id) => ({ interestId: id })),
  };
  const response = await instance.put('members/me/interests', {
    body: JSON.stringify(payload),
  });
  return response;
};
// 비밀번호 수정
export const updatePassword = async (current_password, new_password) => {
  const response = await instance.put('members/me/password', {});
  return response;
};

// 주소 가져오기
export const getAddresses = async () => {
  const response = await instance.get('members/me/addresses');
  return response;
};

// 주소 수정
export const updateAddresses = async (addresses) => {
  const response = await instance.put('members/me/addresses', { body: JSON.stringify(addresses) });
  return response;
};

// 모임카드 목록 조회
export const getCrewCards = async () => {
  const response = await instance.get('members/me/cards');
  return response;
};

// 모임카드 연결
export const attachCrewCard = async (cardId, crewId) => {
  const response = await instance.post('members/me/cards', {});
  return response;
};

// 모임카드 해지
export const detachCrewCard = async (cardId) => {
  const response = await instance.delete(`members/me/cards/${cardId}`);
  return response;
};

// 개인 계좌 목록 조회
export const getPersonalAccounts = async () => {
  const response = await instance.get('members/me/accounts');
  return response;
};

// 개인 계좌 연결
export const attachPersonalAccount = async (accountId, crewId) => {
  const response = await instance.post('members/me/accounts', {});
  return response;
};

// 개인 계좌 해지
export const detachPersonalAccount = async (accountId) => {
  const response = await instance.delete(`members/me/accounts/${accountId}`);
  return response;
};

// 회비 납부 정보 조회
export const getFeePaymentInfo = async (crewId) => {
  const response = await instance.get(`crews/${crewId}/fees`);
  return response;
};

// 회비 납부하기
export const payCrewFee = async (crewId, amount, accountId) => {
  const response = await instance.post(`crews/${crewId}/fees/payment`, {});
  return response;
};

// 거래 내역 조회
export const getTransactionHistory = async (accountId) => {
  const response = await instance.get(`members/me/accounts/${accountId}/transactions`);
  return response;
};
