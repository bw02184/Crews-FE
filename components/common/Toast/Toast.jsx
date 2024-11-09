'use client';

import { useEffect } from 'react';

import { ExclamationTriangleIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { Box, Callout } from '@radix-ui/themes';

import styles from './Toast.module.css';
export default function Toast({ children, as, isActive, onClose, autoClose = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, autoClose);
    return () => clearTimeout(timer);
  }, [onClose, autoClose]);

  return (
    <Box className={`${styles.toast} ${styles[as]} ${isActive ? styles.active : ''}`}>
      {as == 'info' ? (
        <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{children}</Callout.Text>
        </Callout.Root>
      ) : (
        <Callout.Root color="red" role="alert">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>{children}</Callout.Text>
        </Callout.Root>
      )}
    </Box>
  );
}
