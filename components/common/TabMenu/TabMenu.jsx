'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import styles from './TabMenu.module.css';
import { TabNav, Text } from '@radix-ui/themes';

export default function TabMenu({ tabMenuList, dynamicID }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = searchParams.size > 0 ? `${pathname}?${searchParams}` : pathname;

  return (
    <div className={styles.tab_menu}>
      <TabNav.Root>
        {tabMenuList.map((tab) => {
          if (tab.href.includes(':id')) {
            tab.href = tab.href.replace(':id', dynamicID);
          }
          return (
            <TabNav.Link asChild active={url === tab.href} key={`tab_${tab.text}`}>
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
