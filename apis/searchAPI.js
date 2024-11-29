'use server';
import instance from './instance';

export const getAddresses = async (keyword, page) => {
  const response = await instance.get(`agits/search?keyWord=${keyword}&page=${page}`);
  return response;
};
