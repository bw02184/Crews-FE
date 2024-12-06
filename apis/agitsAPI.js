'use server';
import instance from '@/apis/instance';
import { revalidatePath } from 'next/cache';

//공통 회비 조회(남은 회비 잔액, 회비 날짜)
export const getDues = async (agitId, date) => {
  const response = await instance.get(`agits/${agitId}/dues?year=${date.year}&month=${date.month}`);
  return response;
};

//공통 회비 조회(남은 회비 잔액, 회비 날짜)
export const getCommonDues = async (agitId) => {
  const response = await instance.get(`agits/${agitId}/managements/dues/common`);
  return response;
};

//모든 개인,모임통장 조회
export const getAllAccounts = async (date) => {
  const response = await instance.get(`accounts?year=${date.year}&month=${date.month}`);
  return response;
};

// 가입한 아지트 목록 및 역할 조회
export const getAgitInfo = async () => {
  const response = await instance.get('agits/info');
  return response;
};

// 모임통장 정보
export const getAccount = async (agitId) => {
  const response = await instance.get(`agits/${agitId}/accounts`);
  return response;
};

//모임통장 기록 확인
export const getAccountDetails = async (agitId, selectPeriod, transactionType, order) => {
  const response = await instance.get(
    `agits/${agitId}/accounts/details?selectPeriod=${selectPeriod}&transactionType=${transactionType}&order=${order}`,
  );
  return response;
};

// 모임통장에 이체정보 확인
export const getMyAccountHistory = async (date) => {
  const response = await instance.get(`accounts/history?year=${date.year}&month=${date.month}`);
  return response;
};

export const validateAgitName = async (agitName) => {
  const response = await instance.get(`agits/validate-name?agitName=${agitName}`);
  return response;
};

export const getInterest = async () => {
  const response = await instance.get(`interests`);
  return response;
};

export const createAgitRequest = async (formData) => {
  const response = await instance.post('agits', {
    body: JSON.stringify(formData),
  });
};

// 아지트 가입신청
export const applyForAgit = async (agitId, keyWord) => {
  const response = await instance.post('agits/registrations', {
    body: JSON.stringify({ agitId }),
  });
  revalidatePath(`/service/search?q=${keyWord}`);
  return response;
};

// 모임통장에 이체정보 확인
export const transfer = async (agitId, data) => {
  const response = await instance.post(`agits/${agitId}/accounts/transfer`, {
    body: JSON.stringify({ ...data }),
  });
  return response;
};

// 모임통장에 이체정보 확인
export const getDuesProfile = async (agitId, date) => {
  const response = await instance.get(`agits/${agitId}/managements/dues?year=${date.year}&month=${date.month}`);
  return response;
};

// 모임통장에 입금내역 확인
export const crewAccountDepositInfo = async (agitId, date) => {
  const response = await instance.get(`agits/${agitId}/accounts/deposit?year=${date.year}&month=${date.month}`);
  return response;
};

// 모임통장에 입금내역 확인
export const setCommonDues = async (agitId, data) => {
  const response = await instance.post(`agits/${agitId}/managements/dues/common`, {
    body: JSON.stringify({ ...data }),
  });
  return response;
};

// 정모 조회
export const getMeeting = async (agitId, page, pageSize) => {
  const response = await instance.get(`agits/${agitId}/meetings?page=${page}&pageSize=${pageSize}`);
  return response;
};

// 피드 조회
export const getFeeds = async (agitId, page) => {
  const response = await instance.get(`agits/${agitId}/feeds?page=${page}`);
  return response;
};

// 모든 계좌상품 조회
export const getProducts = async () => {
  const response = await instance.get(`products`);
  return response;
};

// 모임통장 계좌 생성
export const generateAccount = async (agitId, productId) => {
  const response = await instance.post(`agits/${agitId}/accounts`, {
    body: JSON.stringify({ productId }),
  });
  return response;
};

// 모임통장 회비 납부 요청
export const callDues = async (agitId, data) => {
  const response = await instance.post(`agits/${agitId}/member/call`, {
    body: JSON.stringify({ ...data }),
  });
  return response;
};

// 모임통장 권한 요청하기
export const sendPermission = async (agitId) => {
  const response = await instance.post(`agits/${agitId}/accounts/permissions`);
  return response;
};

// 모임통장 카드 발급여부 확인
export const cardIssuance = async (agitId) => {
  const response = await instance.get(`agits/${agitId}/accounts/cards`);
  return response;
};

// 모임통장 카드 발급하기
export const cardIssued = async (agitId) => {
  const response = await instance.post(`agits/${agitId}/accounts/cards`);
  return response;
};

// 모임통장 카드 발급해지하기
export const cardRemoved = async (agitId, data) => {
  const response = await instance.delete(`agits/${agitId}/accounts/cards`, {
    body: JSON.stringify({ ...data }),
  });
  return response;
};
