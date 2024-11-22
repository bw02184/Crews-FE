import { Header } from '@/components/common';
import MyInfo from '@/components/mypage/myinfo';

export default function Page() {
  return (
    <div className="page">
      <Header side="center">내 정보 수정</Header>
      <div className="content">
        <section>
          <MyInfo />
        </section>
      </div>
    </div>
  );
}
