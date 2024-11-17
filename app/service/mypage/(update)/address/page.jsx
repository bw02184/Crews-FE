import { Header } from '@/components/common';
import AddressInput from '@/components/mypage/address/AddressInput';
import BottomButton from '@/components/mypage/bottombutton/BootomButton';
import { Flex } from '@radix-ui/themes';

export default function page() {
  return (
    <div className="page">
      <Header side="center">활동지역 수정</Header>
      <div className="content">
        <section>
          <Flex className="row" direction="column" gap="10px">
            <AddressInput />
          </Flex>
          <BottomButton />
        </section>
      </div>
    </div>
  );
}
