import instance from './instance';

export const getSample = async () => {
  const response = await instance.get('');
  return response;
};
