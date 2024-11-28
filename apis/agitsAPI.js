'use server';

import instance from '@/apis/instance';

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
