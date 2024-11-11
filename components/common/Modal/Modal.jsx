'use client';

import styles from './Modal.module.css';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import { ButtonM } from '../Button';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export default function Modal({ isOpen, closeModal, children }) {
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
    <Box className={styles.modal_wrap} onClick={closeModal}>
      <Box className={styles.modal_box}>
        <Box className={`${styles.modal} ${isMotion ? styles.open : ''}`} onClick={(e) => e.stopPropagation()}>
          <Flex direction="column" gap="20px" className="modal_content">
            <Box className={styles.modal_header}>
              <header>
                <Heading as="h3" size="5" align="center">
                  모임명
                </Heading>
                <Text as="p" size="2" weight="medium" align="center">
                  아지트에 가입하시려면 아래 사항을 확인해주세요.
                </Text>
              </header>
              <button className={styles.btn_close} onClick={closeModal}>
                <Cross2Icon />
              </button>
            </Box>
            <Box className={`${styles.modal_body}`}>{children}</Box>
            <Box className={styles.modal_footer}>
              <ButtonM leftText="취소" rightText="확인" leftOnClick={closeModal} rightOnClick={closeModal} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>,
    document.getElementById('portal'),
  );
}
