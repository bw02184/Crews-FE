'use client';

import { Box, Flex, Text } from '@radix-ui/themes';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './ArrowButton.module.css';

const ArrowButton = ({ onClickLeft, onClickRight, children, data }) => {
  const today = new Date(); // 현재 날짜 가져오기
  const [date, setDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1, // 월은 0부터 시작하므로 +1
  });

  const handlePreviousMonth = () => {
    setDate((prevDate) => {
      const newMonth = prevDate.month - 1;
      return newMonth === 0 ? { year: prevDate.year - 1, month: 12 } : { year: prevDate.year, month: newMonth };
    });
  };

  const handleNextMonth = () => {
    setDate((prevDate) => {
      const newMonth = prevDate.month + 1;
      return newMonth === 13 ? { year: prevDate.year + 1, month: 1 } : { year: prevDate.year, month: newMonth };
    });
  };
  return (
    <div>
      <Flex direction="column" gap="10px">
        <Flex justify="center" gap="10px">
          <button
            onClick={handlePreviousMonth}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image src="/icons/ico_left-arrow.svg" width={12} height={7} alt="Left Arrow" />
          </button>
          <Text as="p" size="5" weight="bold">
            {`${date.year}년 ${date.month}월 회비 납부`}
          </Text>
          <button
            onClick={handleNextMonth}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image src="/icons/ico_right-arrow.svg" width={12} height={7} alt="Right Arrow" />
          </button>
        </Flex>
        <Flex justify="center">
          <Box className={styles.dueContent}>
            <Text as="p" size="2" weight="medium">
              {`매월 ${data.dueDay}일, ${data.dueAmount.toLocaleString('ko-KR')}원`}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};

export default ArrowButton;
