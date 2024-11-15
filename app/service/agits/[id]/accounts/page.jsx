import { ButtonM, SelectFilter, TabMenu, Title } from '@/components/common';
import {
  agitsSelectMenuList,
  monthSelectMenuList,
  orderSelectMenuList,
  tranTypeSelectMenuList,
} from '@/constants/selectMenuList/sample';
import { Box, Flex } from '@radix-ui/themes';
import { accounts, accountDetail } from '@/constants/dummy';
import styles from './page.module.css';

import { tabMenuList } from '@/constants/tabMenuList/agits';
import Account from '@/components/Account/Account';
import { getData } from '@/apis/accountsAPI';
import AccountDetail from '@/components/AccountDetail/AccountDetail';
export default async function Page({ params }) {
  const [agits] = agitsSelectMenuList.filter((select) => select.id == params.id);
  const data = await getData(params.id);
  return (
    <div className="page">
      <header>
        <Box className={styles.filter}>
          <SelectFilter isHeader={true} as="link" pathname="/service/agits" selectList={agitsSelectMenuList}>
            {agits?.text}
          </SelectFilter>
        </Box>
        <TabMenu tabMenuList={tabMenuList} dynamicID={params.id} />
      </header>
      <Flex direction="column" gap="10px" className="content">
        <section>
          <Flex direction="column" gap="20px">
            <Title>모임통장 상세</Title>
            <Account accounts={accounts} />
            <ButtonM leftButton={{ text: '권한 요청하기' }} rightButton={{ text: '회비 납부하기' }} />
          </Flex>
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
              {accountDetail.map((detail, i) => {
                return <AccountDetail accountDetail={detail} key={`detail${i}`} />;
              })}
            </ul>
          </Box>
        </section>
      </Flex>
    </div>
  );
}
