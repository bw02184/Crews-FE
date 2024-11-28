'use server';
import instance from '@/apis/instance';

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
