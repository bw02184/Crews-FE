'use server';
import instance from '@/apis/instance';

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
