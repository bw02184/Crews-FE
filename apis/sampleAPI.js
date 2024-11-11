'use server';

import instance from './instance';
import { revalidatePath } from 'next/cache';

export const getPosts = async () => {
  const response = await instance.get('posts');
  return response;
};

export const postPosts = async (title, content) => {
  const response = await instance.post('posts', {
    body: JSON.stringify({ title, content }),
  });

  revalidatePath('/sample');
  return response;
};
