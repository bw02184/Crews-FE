import { getMyAgitCards, getPersonalAccounts } from '@/apis/mypageAPI';
import { ButtonL } from '@/components/common';
import AgitCard from '@/components/mypage/assets/AgitCard';
import MyAccount from '@/components/mypage/assets/MyAccount';
import { Flex } from '@radix-ui/themes';

export default async function Page() {
  const agitCardData = await getMyAgitCards();
  if (agitCardData?.error) {
    throw new Error(agitCardData.error);
  }

  const accountData = (await getPersonalAccounts()) || [];
  if (accountData?.error) {
    throw new Error(accountData.error);
  }
  console.log(JSON.stringify(accountData));

  return (
    <Flex direction="column" gap="20px">
      <MyAccount data={accountData} />
      {agitCardData.length > 0 ? <AgitCard agitCardData={agitCardData} /> : <></>}
      <ButtonL as="link" href="/service/mypage/fee" style="deep">
        회비 납부하기
      </ButtonL>
    </Flex>
  );
}
