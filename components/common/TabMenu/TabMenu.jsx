'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import styles from './TabMenu.module.css';
import { TabNav, Text } from '@radix-ui/themes';

export default function TabMenu({ as = 'link', tabMenuList, baseUrl }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = searchParams?.size > 0 ? `${pathname}?${searchParams}` : pathname;

  const isActiveLink = (href) => {
    const currentUrl = baseUrl + href;
    if (url.replace(baseUrl, '') == '') {
      return currentUrl == pathname;
    } else {
      return currentUrl.startsWith(pathname);
    }
  };

  return (
    <div className={styles.tab_menu}>
      <TabNav.Root>
        {tabMenuList.map((tab, i) => {
          const isActive = as == 'link' ? isActiveLink(tab.href) : url == tab.href;
          return (
            <TabNav.Link asChild active={isActive} key={`tab${i}`}>
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
