'use client';

import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Callout } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import ArrowButton from './ArrowButton';
import FeePayment from './FeePayment';
import { getMyAccountHistory } from '@/apis/agitsAPI';
import TransferHistory from './TransferHistory';
import useSWR from 'swr';

const DateOfDues = ({ agitId, dues, commonDues, allAccounts, history }) => {
  const [yearAndMonth, setYearAndMonth] = useState({});

  const handleDateChange = (newDate) => {
    setYearAndMonth(newDate);
  };
  const { data, mutate } = useSWR(
    yearAndMonth.year && yearAndMonth.month && `accounts/history?year=${yearAndMonth.year}&month=${yearAndMonth.month}`,
    async () => {
      const response = await getMyAccountHistory(yearAndMonth);
      return response;
    },
    {
      fallbackData: history,
    },
  );
  useEffect(() => {
    mutate();
  }, [yearAndMonth, mutate]);

  return (
    <>
      {dues.dueAmount == 0.0 || dues.dueAmount === null ? (
        <section>
          <ArrowButton data={commonDues} handleDateChange={handleDateChange}></ArrowButton>
          <Callout.Root color="green">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>납부완료!</Callout.Text>
          </Callout.Root>
        </section>
      ) : (
        <>
          <section>
            <ArrowButton data={commonDues} handleDateChange={handleDateChange}></ArrowButton>
            <Callout.Root color="red" mt="3">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                회비 납부일이 지났어요! 빨리 {dues.dueAmount.toLocaleString('ko-KR')}원을 납부해주세요.
              </Callout.Text>
            </Callout.Root>
          </section>
          <section>
            <FeePayment agitId={agitId} data={allAccounts}></FeePayment>
          </section>
        </>
      )}
      <section>
        <TransferHistory transactionData={data}></TransferHistory>
      </section>
    </>
  );
};

export default DateOfDues;
