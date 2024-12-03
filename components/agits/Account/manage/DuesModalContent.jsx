'use client';

import { Box, Flex, Text } from '@radix-ui/themes';
import styles from './DuesModalContent.module.css';
import { ButtonM, CheckBox, SelectFilter } from '@/components/common';
import { daySelectMenuList } from '@/constants/selectMenuList/sample';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { setCommonDues } from '@/apis/agitsAPI';

export default function DuesModalContent({ agitId }) {
  const [formattedValue, setFormattedValue] = useState('');
  const [selectedDay, setSelectedDay] = useState(1);

  const daySelect = (filter, params) => {
    setSelectedDay(params);
  };
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleSubmitPattern = async (data) => {
    if (data.user_dueAmount == undefined || data.user_dueAmount == null) {
      throw new Error('금액을 입력 해 주세요!');
    }
    const agitData = {
      dueDay: selectedDay,
      dueAmount: data.user_dueAmount,
    };
    console.log(agitData);
    const response = await setCommonDues(agitId, agitData);
    if (response?.errorCode) {
      throw new Error(response.message);
    }
  };
  const handleNumberChange = (e) => {
    let input = e.target.value;
    const numericValue = input.replace(/[^0-9]/g, '');
    const formatted = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setFormattedValue(formatted);
    setValue('user_dueAmount', numericValue);
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
              <Box className={styles.input}>
                <input
                  type="text"
                  id="user_dueAmount"
                  onInput={handleNumberChange}
                  value={formattedValue}
                  className={errors.user_dueAmount ? 'error' : ''}
                />
              </Box>
              {errors.user_dueAmount && (
                <Text as="p" className="error">
                  {errors.user_dueAmount.message}
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
