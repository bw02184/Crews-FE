'use client';

import Image from 'next/image';
import styles from './Header.module.css';
import { Box, Heading } from '@radix-ui/themes';

export default function Header({ side = 'left', children }) {
  return (
    <header className={styles.header}>
      <Box className={side == 'left' ? styles.left : styles.center}>
        {side == 'center' && (
          <button
            onClick={() => {
              window.history.back();
            }}
          >
            <Image src="/icons/ico_back.svg" width={19} height={19} alt="뒤로가기" />
          </button>
        )}
        <Heading as="h2" align="center">
          {children}
        </Heading>
      </Box>
    </header>
  );
}
