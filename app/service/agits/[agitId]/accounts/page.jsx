import { SelectFilter } from '@/components/common';
import { monthSelectMenuList, orderSelectMenuList, tranTypeSelectMenuList } from '@/constants/selectMenuList/sample';
import { Box, Flex } from '@radix-ui/themes';
import { getAccount, getAccountDetails } from '@/apis/agitsAPI';
import AgitHeader from '@/components/agits/AgitHeader';
import AccountAndButton from '@/components/agits/Account/AccountAndButton';

import AccountDetail from '@/components/agits/Account/AccountDetail';

export default async function Page({ params }) {
  const data = await getAccount(params.agitId);
  if (data?.errorCode) {
    throw new Error(data.message);
  }
  const accountDetails = await getAccountDetails(params.agitId, 3, 'ALL', 'DESC');
  if (accountDetails?.errorCode) {
    throw new Error(accountDetails.message);
  }
  return (
    <div className="page">
      <AgitHeader currentId={params.agitId} />
      <Flex direction="column" gap="10px" className="content">
        <section>
          <AccountAndButton agitId={params.agitId} data={data}></AccountAndButton>
        </section>
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
              {accountDetails?.tranList?.map((detail, i) => {
                return <AccountDetail data={detail} key={`detail${i}`} />;
              })}
            </ul>
          </Box>
        </section>
      </Flex>
    </div>
  );
}
