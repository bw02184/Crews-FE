import { ButtonL } from '@/components/common';
import AgitCard from '@/components/mypage/assets/AgitCard';
import MyAccount from '@/components/mypage/assets/MyAccount';
import { Flex } from '@radix-ui/themes';

export default function Page() {
  return (
    <Flex direction="column" gap="20px">
      <AgitCard></AgitCard>
      <MyAccount></MyAccount>
      <ButtonL as="link" href="/service/mypage/fee" style="deep">
        회비 납부하기
      </ButtonL>
    </Flex>
  );
}
