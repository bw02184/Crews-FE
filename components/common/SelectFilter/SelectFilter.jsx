'use client';

import Link from 'next/link';
import styles from './SelectFilter.module.css';
import { Box } from '@radix-ui/themes';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SelectFilter({ isHeader, as = 'params', filter, defaultParams, selectList, pathname }) {
  const [openSelect, setOpenSelect] = useState(false);
  const searchParams = useSearchParams();

  // 현재 filter 값으로 받아올 서치 파라미터가 없을 경우 기본값 설정
  const currentParams = searchParams.get(filter) || defaultParams;

  // 서치 파라미터가 중첩되게끔
  const createLink = (href) => {
    const url = new URL(window.location.href);
    const currentParams = new URLSearchParams(url.search);
    const selectParams = new URLSearchParams(new URL(href, process.env.NEXT_PUBLIC_CLIENT_URL).search);

    currentParams.set(filter, selectParams.get(filter));
    const sortedParams = new URLSearchParams();

    // 서치 파라미터 정렬
    Array.from(currentParams.entries())
      .sort(([keyA], [keyB]) => (keyA > keyB ? 1 : -1))
      .forEach(([key, value]) => sortedParams.append(key, value));

    url.search = sortedParams.toString();
    return url.toString();
  };

  // .select > button 에서 보여줄 현재값 감지
  const [current] = selectList.filter((menu) => {
    if (as == 'link') {
      return defaultParams == menu.id;
    } else {
      return new URL(menu.href, process.env.NEXT_PUBLIC_CLIENT_URL).searchParams.get(filter) == currentParams;
    }
  });

  // .select > ul 에서 활성화될 현재값 감지
  const isActive = (select) => {
    if (as == 'link') {
      return defaultParams == select.id;
    }
    const selectParams = new URL(select.href, process.env.NEXT_PUBLIC_CLIENT_URL).searchParams.get(filter);

    if (currentParams && selectParams) {
      return currentParams == selectParams;
    }

    return false;
  };

  return (
    <Box className={`${styles.select} ${isHeader ? styles.header : ''}`}>
      <button
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
      >
        {current?.text}
      </button>
      {openSelect && (
        <ul>
          {selectList.map((select, i) => {
            const updateHref = createLink(select.href);
            return (
              <li key={`selectFilter${i}`}>
                <Link href={as == 'link' ? `${pathname}/${select.id}` : updateHref}>
                  <button
                    className={isActive(select) ? styles.active : ''}
                    onClick={() => {
                      setOpenSelect(false);
                    }}
                  >
                    {select.text}
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Box>
  );
}
