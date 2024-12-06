'use server';

import instance from '@/apis/instance';
import { revalidatePath } from 'next/cache';

// 카테고리별 조회
export const getAgits = async (id, page) => {
  const response = await instance.get(`agits?subject-id=${id}&page=${page}`);
  return response;
};

//공통 회비 조회(남은 회비 잔액, 회비 날짜)
export const getDues = async (id) => {
  const response = await instance.get(`agits/${id}/dues`);
  return response;
};

//공통 회비 조회(남은 회비 잔액, 회비 날짜)
export const getCommonDues = async (id) => {
  const response = await instance.get(`agits/${id}/managements/dues/common`);
  return response;
};

//모든 개인,모임통장 조회
export const getAllAccounts = async () => {
  const response = await instance.get(`accounts`);
  return response;
};

// 가입한 아지트 목록 및 역할 조회
export const getAgitInfo = async () => {
  const response = await instance.get('agits/info');
  return response;
};

// 모임통장 정보
export const getAccount = async (id) => {
  const response = await instance.get(`agits/${id}/accounts`);
  return response;
};

//모임통장 기록 확인
export const getAccountDetails = async (id, selectPeriod, transactionType, order) => {
  const response = await instance.get(
    `agits/${id}/accounts/details?selectPeriod=${selectPeriod}&transactionType=${transactionType}&order=${order}`,
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

// 모집임박/신규 아지트 조회
export const getRecruitNewAgits = async () => {
  const response = await instance.get('agits/home');
  return response;
};
