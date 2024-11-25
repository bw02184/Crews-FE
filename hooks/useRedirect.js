import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useRedirect = (delay = 3000) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/service');
    }, delay);

    return () => clearTimeout(timer);
  }, []);
};

export default useRedirect;
