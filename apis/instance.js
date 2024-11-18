const fetchInstance = async (url, options) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const SAMPLE_URL = 'http://lmrdb.duckdns.org:8080/';

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

    return await response.json();
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
