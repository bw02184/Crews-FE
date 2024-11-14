'use client';

import Link from 'next/link';
import styles from './SelectFilter.module.css';
import { Box } from '@radix-ui/themes';
import { useState } from 'react';

export default function SelectFilter({ isHeader, as = 'params', filter, pathname, selectList, children }) {
  const [openSelect, setOpenSelect] = useState(false);
  const [current, setCurrent] = useState(children);

  const selectHandler = (select) => {
    // as = "params" 일때 여기서 fetch 요청
    if (as == 'params') console.log(`filter: ${filter} / params: ${select.params}`);

    setOpenSelect(false);
    setCurrent(select.text);
  };

  const isActive = (select) => {
    return current == select.text;
  };

  return (
    <Box className={`${styles.select} ${isHeader ? styles.header : ''}`}>
      <button
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
      >
        {current}
      </button>
      {openSelect && (
        <ul>
          {selectList.map((select, i) => {
            return (
              <li key={`selectFilter${i}`}>
                {as == 'link' ? (
                  <Link href={as == 'link' ? `${pathname}/${select.id}` : ''}>
                    <button
                      className={isActive(select) ? styles.active : ''}
                      onClick={() => {
                        selectHandler(select);
                      }}
                    >
                      {select.text}
                    </button>
                  </Link>
                ) : (
                  <button
                    className={isActive(select) ? styles.active : ''}
                    onClick={() => {
                      selectHandler(select);
                    }}
                  >
                    {select.text}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Box>
  );
}
