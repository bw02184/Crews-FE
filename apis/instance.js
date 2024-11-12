const fetchInstance = async (url, options) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + 'api/vi';
  const SAMPLE_URL = 'http://lmrdb.duckdns.org:8080/';

  try {
    const response = await fetch(`${SAMPLE_URL}${url}`, {
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

    if (response.headers.get('Content-Type')?.includes('application/json')) return await response.json();
    else return await response.text();
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
