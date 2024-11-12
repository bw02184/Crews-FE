'use client';

import styles from './Modal.module.css';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import { ButtonM } from '../Button';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export default function Modal({ isOpen, closeModal, children, header }) {
  const [isMotion, setIsMotion] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsMotion(true);
      }, 100);
    } else {
      setIsMotion(false);
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <Box className={`${styles.modal_wrap} ${isMotion ? styles.open : ''}`} onClick={closeModal}>
      <Box p="3" className={styles.modal_box}>
        <Box p="3" className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <Flex direction="column" gap="20px" className="modal_content">
            <Box className={styles.modal_header}>
              <header>
                <Heading as="h3" size="5" align="center">
                  {header.title}
                </Heading>
                {header.text && (
                  <Text as="p" size="2" weight="medium" align="center">
                    {header.text}
                  </Text>
                )}
              </header>
              <button className={styles.btn_close} onClick={closeModal}>
                <Cross2Icon />
              </button>
            </Box>
            <Box className={`${styles.modal_body}`}>{children}</Box>
            <Box className={styles.modal_footer}>
              <ButtonM
                leftButton={{ text: '취소', onClick: closeModal }}
                rightButton={{ text: '확인', onClick: closeModal }}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>,
    document.getElementById('portal'),
  );
}
