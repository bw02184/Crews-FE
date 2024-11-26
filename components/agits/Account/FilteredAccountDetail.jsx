'use client';
import { SelectFilter } from '@/components/common';
import { Box, Flex } from '@radix-ui/themes';
import AccountDetail from './AccountDetail';
import { useAccountStore } from '@/stores/agitStore';
import { monthSelectMenuList, orderSelectMenuList, tranTypeSelectMenuList } from '@/constants/selectMenuList/sample';
import useSWR from 'swr';
import instance from '@/apis/instance';
import { postAccountDetails } from '@/apis/agitsAPI';
import { useEffect, useState } from 'react';

export default function FilteredAccountDetail(agitId) {
  const accountId = useAccountStore((state) => state.accountData.accountId);
  const fintecUseNum = useAccountStore((state) => state.accountData.fintecUseNum);
  //   console.log(accountId);
  //   console.log(fintecUseNum);
  //   console.log(agitId);
  //   console.log(`accountId: ${accountId}`);
  //   const {
  //     data:accountDetails,
  //     error,
  //     isLoading,
  //     mutate,
  //   } = useSWR(
  //     `agits/4/accounts/5/details`,
  //     async () =>
  //       await instance.post(`agits/4/accounts/5/details`, {
  //         body: JSON.stringify({ fintechUseNum: fintecUseNum, selectPeriod: 3, transactionType: 'ALL', order: 'DESC' }),
  //       }),
  //   );
  //   console.log(`error: ${error}`);
  const [responseData, setResponseData] = useState(null); // 데이터 상태 생성
  useEffect(() => {
    const fetchData = async () => {
      const response = await postAccountDetails(agitId.agitId, accountId, fintecUseNum, 3, 'ALL', 'ASC');
      console.log(response);
      return response;
    };
    setResponseData(fetchData());
  }, []);

  //   console.log(`/agits/${agitId.agitId}/accounts/5/details`);
  //   console.log{`${accountDetails}`);
  //   console.log(`isLoading: ${isLoading}`);
  const accountDetail = [];
  return (
    <section>
      <Flex justify="end" gap="5px">
        <SelectFilter filter="filter" selectList={monthSelectMenuList}>
          3개월
        </SelectFilter>
        <SelectFilter filter="filter" selectList={tranTypeSelectMenuList}>
          전체
        </SelectFilter>
        <SelectFilter filter="filter" selectList={orderSelectMenuList}>
          최신순
        </SelectFilter>
      </Flex>
      <Box mt="1">
        <ul>
          {responseData?.tranList?.map((detail, i) => {
            return <AccountDetail data={detail} key={`detail${i}`} />;
          })}
        </ul>
      </Box>
    </section>
  );
}
