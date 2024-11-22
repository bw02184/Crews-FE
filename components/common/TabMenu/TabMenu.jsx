'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import styles from './TabMenu.module.css';
import { TabNav, Text } from '@radix-ui/themes';
import { useState } from 'react';

export default function TabMenu({ as = 'link', tabMenuList, dynamicID }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = searchParams?.size > 0 ? `${pathname}?${searchParams}` : pathname;
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={styles.tab_menu}>
      <TabNav.Root>
        {tabMenuList.map((tab) => {
          if (tab.href.includes(':id')) {
            tab.href = tab.href.replace(':id', dynamicID);
          }
          const isActive = as == 'link' ? url === tab.href || url.startsWith(tab.href + '/') : url === tab.href;

          return (
            <TabNav.Link asChild active={isActive} key={`tab_${tab.text}`}>
              <Link href={tab.href}>
                <Text as="p" size="3" weight="medium">
                  {tab.text}
                </Text>
              </Link>
            </TabNav.Link>
          );
        })}
      </TabNav.Root>
    </div>
  );
}
