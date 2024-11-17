import { Header } from '@/components/common';
import NicknameForm from '@/components/mypage/nickname/NicknameForm';

export default function page() {
  return (
    <div className="page">
      <Header side="center">닉네임 수정</Header>
      <div className="content">
        <section>
          <NicknameForm />
        </section>
      </div>
    </div>
  );
}
