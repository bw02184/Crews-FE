'use client';

import { Box, Flex, Text } from '@radix-ui/themes';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './ArrowButton.module.css';

const ArrowButton = ({ data }) => {
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
          <button onClick={handlePreviousMonth}>
            <Image src="/icons/ico_left-arrow.svg" width={18} height={10} alt="Left Arrow" />
          </button>
          <Text as="p" size="5" weight="bold">
            {`${date.year}년 ${date.month}월 회비`}
          </Text>
          <button onClick={handleNextMonth}>
            <Image src="/icons/ico_right-arrow.svg" width={18} height={10} alt="Right Arrow" />
          </button>
        </Flex>
        <Box align="center">
          <Text as="p" size="2" weight="medium" className="gray_btn">
            {`매월 ${data.dueDay}일, ${data.dueAmount.toLocaleString('ko-KR')}원`}
          </Text>
        </Box>
      </Flex>
    </div>
  );
};

export default ArrowButton;
