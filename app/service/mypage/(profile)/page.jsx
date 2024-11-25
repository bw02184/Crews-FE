import { Flex } from '@radix-ui/themes';
import MyAgitList from '@/components/mypage/MyAgitList';
import BottomUtil from '@/components/mypage/BottomUtil';
import { getMyAgit } from '@/apis/mypageAPI';

export default async function Page() {
  const AgitData = await getMyAgit();

  if (AgitData?.error) {
    throw new Error(AgitData.error);
  }
  return (
    <Flex direction="column" gap="10px">
      <MyAgitList data={AgitData} />
      <BottomUtil />
    </Flex>
  );
}
