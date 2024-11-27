'use client';

import { SelectFilter, TabMenu } from '@/components/common';
import { useEffect, useState } from 'react';
import { tabMenuList } from '@/constants/tabMenuList/agits';
import { useAgitInfoStore } from '@/stores/authStore';

export default function AgitHeader({ currentId }) {
  const [agitInfo, setAgitInfo] = useState([]);
  const [agit, setAgit] = useState(null);
  const { agitInfoList, setAgitInfoList } = useAgitInfoStore();

  useEffect(() => {
    const storedAgitInfo = JSON.parse(localStorage.getItem('agitInfoList')).map((agit) => ({
      id: agit.agitId,
      text: agit.agitName,
      memberRole: agit.memberRole,
    }));
    setAgitInfo(storedAgitInfo);
    setAgitInfoList(storedAgitInfo);
  }, []);

  useEffect(() => {
    if (agitInfo.length > 0) {
      const [filtered] = agitInfo.filter((select) => select.id == currentId);
      setAgit(filtered);
    }
  }, [agitInfo, currentId]);

  return (
    <header>
      <div style={{ height: 60 }}>
        {agit && (
          <SelectFilter isHeader={true} as="link" pathname="/service/agits" selectList={agitInfo}>
            {agit?.text}
          </SelectFilter>
        )}
      </div>
      <TabMenu tabMenuList={tabMenuList} baseUrl={`/service/agits/${agit?.id}`} />
    </header>
  );
}
