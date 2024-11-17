import AgitCardList from '@/components/mypage/agitcardlist/AgitCardList';
import BottomButton from '@/components/mypage/bottombutton/BootomButton';
import { agits } from '@/constants/dummy';
import { Flex } from '@radix-ui/themes';

export default function Page() {
  return (
    <Flex direction="column" gap="20px">
      <AgitCardList data={agits} />
      <BottomButton />
    </Flex>
  );
}
