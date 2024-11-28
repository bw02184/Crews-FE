import { SelectFilter } from '@/components/common';
import { monthSelectMenuList, orderSelectMenuList, tranTypeSelectMenuList } from '@/constants/selectMenuList/sample';
import { Box, Flex } from '@radix-ui/themes';
import AccountAndButton from '@/components/agits/Account/AccountAndButton';
import { getAccount, getAccountDetails } from '@/apis/agitsAPI';
import AccountDetail from '@/components/agits/Account/AccountDetail';
import AgitHeader from '@/components/agits/AgitHeader';
export default async function Page({ params }) {
  const data = await getAccount(params.agitId);
  const accountDetails = await getAccountDetails(params.agitId, 3, 'ALL', 'DESC');
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
