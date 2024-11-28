import { getAllAccounts, getCommonDues, getDues } from '@/apis/agitsAPI';
import DateOfDues from '@/components/agits/Account/DateOfDues';
import { Header } from '@/components/common';

import { Flex } from '@radix-ui/themes';

export default async function Page({ params }) {
  const allAccounts = await getAllAccounts();
  const dues = await getDues(params.agitId);
  const commonDues = await getCommonDues(params.agitId);

  return (
    <div className="page">
      <header>
        <Header side="center">회비 납부</Header>
      </header>
      <Flex direction="column" gap="10px" className="content">
        <DateOfDues agitId={params.agitId} dues={dues} commonDues={commonDues} allAccounts={allAccounts}></DateOfDues>
      </Flex>
    </div>
  );
}
