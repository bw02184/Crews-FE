import { agits } from '@/constants/dummy';
import { Flex } from '@radix-ui/themes';
import MyAgitList from '@/components/mypage/MyAgitList';
import BottomUtil from '@/components/mypage/BottomUtil';

export default function Page() {
  return (
    <Flex direction="column" gap="10px">
      <MyAgitList data={agits} />
      <BottomUtil />
    </Flex>
  );
}
