'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import styles from './TabMenu.module.css';
import { TabNav, Text } from '@radix-ui/themes';

export default function TabMenu({ as = 'link', tabMenuList, baseUrl, activeTab }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = searchParams?.size > 0 ? `${pathname}?${searchParams}` : pathname;

  const isActiveLink = (href) => {
    const currentUrl = baseUrl + href;
    if (currentUrl.replace(baseUrl, '') == '') {
      return currentUrl == pathname;
    } else {
      return pathname.startsWith(currentUrl);
    }
  };

  return (
    <div className={styles.tab_menu}>
      <TabNav.Root>
        {tabMenuList.map((tab, i) => {
          const isActive = as == 'link' && !activeTab ? isActiveLink(tab.href) : url == tab.href;
          return (
            <TabNav.Link asChild active={!activeTab ? isActive : i == activeTab} key={`tab${i}`}>
              <Link href={as == 'link' ? baseUrl + tab.href : tab.href}>
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
