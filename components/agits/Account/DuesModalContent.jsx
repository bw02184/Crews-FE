'use client';

import { Box, Flex, Text } from '@radix-ui/themes';
import styles from './DuesModalContent.module.css';
import { ButtonM, CheckBox, SelectFilter } from '@/components/common';
import { daySelectMenuList } from '@/constants/selectMenuList/sample';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function DuesModalContent() {
  const [formattedValue, setFormattedValue] = useState('');

  const daySelect = (filter, params) => {
    console.log(params);
  };
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleSubmitPattern = (data) => {
    console.log(data);
  };
  const handleNumberChange = (e) => {
    let input = e.target.value;
    const numericValue = input.replace(/[^0-9]/g, '');
    const formatted = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setFormattedValue(formatted);
    setValue('user_dueDay', numericValue);
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitPattern)}>
      <Flex direction="column" gap="20px">
        <div className={styles.top}>
          <Flex align="center" gap="10px">
            <Text as="p" size="2" weight="medium">
              매월
            </Text>
            <SelectFilter filter="day" selectList={daySelectMenuList} onSelect={daySelect} scrollY={true}>
              {daySelectMenuList[0].text}
            </SelectFilter>
          </Flex>

          <Flex gap="10px" align="center">
            <Box>
              <Text htmlFor="user_dueDay"></Text>
              <Box className={styles.input}>
                <input
                  type="text"
                  id="user_dueDay"
                  onInput={handleNumberChange}
                  value={formattedValue}
                  className={errors.user_dueDay ? 'error' : ''}
                />
              </Box>
              {errors.user_dueDay && (
                <Text as="p" className="error">
                  {errors.user_dueDay.message}
                </Text>
              )}
            </Box>
            <Text as="p" size="2" weight="medium">
              원 만큼
            </Text>
          </Flex>
        </div>
        <Flex justify="end">
          <CheckBox value="2" defaultChecked={true}>
            금액 및 날짜를 확인하셨나요?
          </CheckBox>
        </Flex>
        <ButtonM leftButton={{ text: '취소' }} rightButton={{ type: 'submit', text: '신청' }} />
      </Flex>
    </form>
  );
}
