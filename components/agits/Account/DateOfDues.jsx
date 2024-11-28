'use client';

import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Callout } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import ArrowButton from './ArrowButton';
import FeePayment from './FeePayment';
import { getMyAccountHistory } from '@/apis/agitsAPI';
import TransferHistory from './TransferHistory';

const DateOfDues = ({ agitId, dues, commonDues, allAccounts }) => {
  const [yearAndMonth, setYearAndMonth] = useState({});
  const [data, setData] = useState([]);

  const handleDateChange = (newDate) => {
    setYearAndMonth(newDate);
  };

  useEffect(() => {
    if (yearAndMonth.year && yearAndMonth.month) {
      const fetchData = async () => {
        try {
          const response = await getMyAccountHistory(yearAndMonth);
          setData(response);
          console.log('응답 데이터:', response);
          return response;
        } catch (error) {
          console.error('API 요청 실패:', error);
        }
      };

      fetchData();
    }
  }, [yearAndMonth, agitId]);
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
