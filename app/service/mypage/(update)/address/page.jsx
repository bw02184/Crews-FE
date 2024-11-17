import { Header } from '@/components/common';
import AddressInputBox from '@/components/mypage/address/AddressInputBox';
import BottomButton from '@/components/mypage/bottombutton/BootomButton';

export default function page() {
  return (
    <div className="page">
      <Header side="center">활동지역 수정</Header>
      <div className="content">
        <section>
          <AddressInputBox />
          <BottomButton />
        </section>
      </div>
    </div>
  );
}
