'use client';

import { useEffect, useState } from 'react';
import styles from './PinNumber.module.css';
import { Box, Flex } from '@radix-ui/themes';
import { ButtonM } from '../Button';
import { Controller, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PinNumber({ defaultParams }) {
  // 입력값 관리
  const { control, handleSubmit, reset } = useForm();
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [shuffleNumbers, setShuffleNumbers] = useState([]);

  // stage 관리
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams?.get('stage') || defaultParams;

  // 키보드 랜덤 배열
  useEffect(() => {
    const numbers = Array.from({ length: 10 }, (_, i) => i.toString());
    setShuffleNumbers(numbers.sort(() => Math.random() - 0.5));
  }, []);

  const clickHandler = (number) => {
    if (pin.every((digit) => digit !== '')) return;

    const nextPin = [...pin];
    const currentIdx = nextPin.findIndex((digit) => digit == '');
    if (currentIdx != -1) {
      nextPin[currentIdx] = number;
      setPin(nextPin);
    }
  };

  const deleteHandler = () => {
    const prevIdx =
      pin.findIndex((digit) => digit == '') - 1 < 0 ? pin.length - 1 : pin.findIndex((digit) => digit === '') - 1;
    if (prevIdx < 0) return;

    const nextPin = [...pin];
    nextPin[prevIdx] = '';
    setPin(nextPin);
  };

  const resetHandler = () => {
    setPin(['', '', '', '', '', '']);
    reset();
  };

  const onSubmit = () => {
    const pinNumber = Number(pin.join(''));
    console.log(pinNumber);

    if (step == 'enter' || step == 'create') {
      router.push('?stage=confirm');
    }
  };

  return (
    <Flex direction="column" gap="20px" asChild>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap="10px">
          <Box className={styles.input_list}>
            <Flex gap="10px" asChild>
              <ul>
                {pin.map((digit, i) => {
                  return (
                    <li key={`pin${i}`} className={digit != '' ? styles.active : ''}>
                      <span>
                        <Controller
                          name={`pin${i}`}
                          control={control}
                          defaultValue={digit}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="text"
                              maxLength={1}
                              value={digit ? '*' : ''}
                              onChange={(e) => {
                                const updatedPin = [...pin];
                                updatedPin[i] = e.target.value;
                                setPin(updatedPin);
                              }}
                              readOnly
                            />
                          )}
                        />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Flex>
          </Box>
          <Box className={styles.keyboard} align="center">
            <Flex justify="center" gap="10px" wrap="wrap" asChild>
              <ul>
                {shuffleNumbers.map((number) => {
                  return (
                    <li key={`keyboard${number}`}>
                      <button type="button" key={number} onClick={() => clickHandler(number)}>
                        {number}
                      </button>
                    </li>
                  );
                })}
                <li>
                  <button type="button" onClick={deleteHandler}>
                    삭제
                  </button>
                </li>
              </ul>
            </Flex>
          </Box>
        </Flex>
        <Box className="btn_group">
          {step == 'create' && <ButtonM rightButton={{ type: 'submit', text: '생성' }} />}
          {step == 'confirm' && <ButtonM rightButton={{ type: 'submit', text: '확인' }} />}
          {step == 'error' && (
            <ButtonM
              leftButton={{ type: 'button', text: '재입력', onClick: resetHandler }}
              rightButton={{ type: 'submit', text: '재설정' }}
            />
          )}
        </Box>
      </form>
    </Flex>
  );
}
