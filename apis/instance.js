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
        throw new Error('토큰 만료');
      }
      throw new Error(`fetch error [${errorResponse}]`);
    }

    if (url == 'members/login' || url == 'members/reissue' || url == 'members/logout') {
      return response;
    }

    if (response.headers.get('Content-Type')?.includes('application/json')) {
      console.log('json.json()');
      return await response.json();
    } else {
      console.log('json.text()');
      return await response.text();
    }
  } catch (error) {
    throw new Error(`fetch error [${error}]`);
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
