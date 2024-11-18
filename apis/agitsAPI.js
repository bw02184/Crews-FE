import instance from '@/apis/instance';

export const getData = async (id) => {
  const response = await instance.get(`agits/${id}/accounts`, {
    //TODO: 로그인 전까지 임시로 사용할 토큰 번호 작성하기
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiKzcydjByaWtOZkMraUFyNytxSXJUZnN1TXBlcCt1bmIyL2hzV0hIRlhaYz0iLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzMxNjM5ODUzLCJleHAiOjE3MzE2NDA0NTN9.NVKKLFlrOh9L6N_Qox1VjxJPryQicux4zN8B3meIFE4',
    },
  });
  return response;
};
