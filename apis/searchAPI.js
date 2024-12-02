'use server';
import instance from './instance';

export const searchAgits = async (keyword, page) => {
  try {
    const response = await instance.get(`agits/search?keyWord=${keyword}&page=${page}`);
    if (!response || response.error) {
      throw new Error(response.message || 'Failed to fetch search results');
    }
    return response;
  } catch (error) {
    console.error('searchAgits error:', error);
    throw error;
  }
};
