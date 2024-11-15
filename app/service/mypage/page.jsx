import AgitCardList from '@/components/mypage/agitcardlist/AgitCardList';
import BottomButton from '@/components/mypage/bottombutton/BootomButton';
import Sortdown from '@/components/mypage/sortdowns/Sortdowns';
import { agits } from '@/constants/dummy';
import { Flex } from '@radix-ui/themes';

export default function Page() {
  return (
    <Flex direction="column" gap="20px">
      <Sortdown />
      <AgitCardList data={agits} />
      <BottomButton />
    </Flex>
  );
}
