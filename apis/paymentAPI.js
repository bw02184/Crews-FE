'use server';

import { revalidatePath } from 'next/cache';
import instance from './instance';

// 아지트 및 카드정보 가져오기
export const getAgitAndCardInfo = async () => {
  const response = await instance.get('payments');
  return response;
};
