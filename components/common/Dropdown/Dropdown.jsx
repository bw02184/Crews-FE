'use client';

import { useState } from 'react';
import styles from './Dropdown.module.css';
import { Box } from '@radix-ui/themes';
import Link from 'next/link';

export default function Dropdown({ as = 'button', side = 'left', menuList, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box className={`${styles.dropdown} popover`}>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {children}
      </div>
      {isOpen && (
        <ul className={side == 'right' ? styles.right : ''}>
          {menuList.map((menu, i) => {
            return (
              <li key={`dropdown${i}`}>
                {as == 'button' ? (
                  <button onClick={menu.onClick}>{menu.text}</button>
                ) : (
                  <Link href={menu.href}>{menu.text}</Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Box>
  );
}
