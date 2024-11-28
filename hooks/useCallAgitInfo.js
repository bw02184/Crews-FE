'use client';

import { useAgitInfoStore } from '@/stores/authStore';
import { useEffect } from 'react';

export const useCallAgitInfo = () => {
  const { agitInfoList, setAgitInfoList } = useAgitInfoStore();

  useEffect(() => {
    if (agitInfoList == null) {
      const storedAgitInfo = JSON.parse(localStorage.getItem('agitInfoList')).map((agit) => ({
        id: agit.agitId,
        text: agit.agitName,
        memberRole: agit.memberRole,
      }));
      setAgitInfoList(storedAgitInfo);
    }
  }, []);
};

export default useCallAgitInfo;
