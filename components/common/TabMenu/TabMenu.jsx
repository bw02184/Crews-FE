'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './TabMenu.module.css';
import { TabNav, Text } from '@radix-ui/themes';

export default function TabMenu({ as = 'link', tabMenuList, dynamicID }) {
  const pathname = usePathname();

  return (
    <div className={styles.tab_menu}>
      <TabNav.Root>
        {tabMenuList.map((tab) => {
          if (tab.href.includes(':id')) {
            tab.href = tab.href.replace(':id', dynamicID);
          }
          const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/');

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
