'use client';

import Link from 'next/link';
import styles from './SelectFilter.module.css';
import { Box } from '@radix-ui/themes';
import { useState } from 'react';

export default function SelectFilter({ isHeader, as = 'params', filter, pathname, selectList, onSelect, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(children);

  const handleSelect = (select) => {
    if (as === 'params') {
      onSelect(filter, select.params);
    }

    setIsOpen(false);
    setCurrent(select.text);
  };

  const isActive = (select) => {
    return current == select.text;
  };

  return (
    <Box className={`${styles.select} ${isHeader ? `${styles.header} header` : ''} popover`}>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {current}
      </button>
      {isOpen && (
        <ul>
          {selectList.map((select, i) => {
            return (
              <li key={`selectFilter${i}`}>
                {as == 'link' ? (
                  <Link href={as == 'link' ? `${pathname}/${select.id}` : ''}>
                    <button
                      className={isActive(select) ? styles.active : ''}
                      onClick={() => {
                        handleSelect(select);
                      }}
                    >
                      {select.text}
                    </button>
                  </Link>
                ) : (
                  <button
                    className={isActive(select) ? styles.active : ''}
                    onClick={() => {
                      handleSelect(select);
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
