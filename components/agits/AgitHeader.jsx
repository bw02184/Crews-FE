'use client';

import { SelectFilter, TabMenu } from '@/components/common';
import { useEffect, useState } from 'react';
import { tabMenuList } from '@/constants/tabMenuList/agits';
import { useAgitInfoStore } from '@/stores/authStore';
import { Skeleton } from '@radix-ui/themes';
import styles from './AgitHeader.module.css';
import { useCallAgitInfo } from '@/hooks';

export default function AgitHeader({ currentId }) {
  const { agitInfoList } = useAgitInfoStore();
  const [agit, setAgit] = useState(null);

  useCallAgitInfo();

  useEffect(() => {
    if (agitInfoList?.length > 0) {
      const [filtered] = agitInfoList.filter((select) => select.id == currentId);
      setAgit(filtered);
    }
  }, [agitInfoList, currentId]);

  return (
    <header>
      <div className={styles.agit_filter}>
        {agit ? (
          <SelectFilter isHeader={true} as="link" pathname="/service/agits" selectList={agitInfoList}>
            {agit?.text}
          </SelectFilter>
        ) : (
          <Skeleton className={styles.skeleton} />
        )}
      </div>
      <TabMenu tabMenuList={tabMenuList} baseUrl={`/service/agits/${agit?.id}`} />
    </header>
  );
}
