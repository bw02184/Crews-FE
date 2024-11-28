import { auth } from '@/auth';
import { BASE_URL } from '@/constants/auth';

const fetchInstance = async (url, options) => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      if (response.status === 403) {
        console.error('Token Expired');
      }
      console.error('Fetch Error:', errorResponse);
      return errorResponse;
    } else {
      // 로그인/로그아웃의 경우 response.headers에서 토큰 추출
      if (url == 'members/login' || url == 'members/logout') return response;

      // 그 외의 경우
      if (response.headers.get('Content-Type')?.includes('application/json')) return await response.json();
      else return await response.text();
    }
  } catch (error) {
    console.log('Fetch error: ', error);
    throw new Error(`Fetch error [${error}]`);
  }
};

const instance = {
  get: (url, options) => fetchInstance(url, { ...options, method: 'GET' }),
  post: (url, options) => fetchInstance(url, { ...options, method: 'POST' }),
  put: (url, options) => fetchInstance(url, { ...options, method: 'PUT' }),
  patch: (url, options) => fetchInstance(url, { ...options, method: 'PATCH' }),
  delete: (url, options) => fetchInstance(url, { ...options, method: 'DELETE' }),
};

export default instance;
