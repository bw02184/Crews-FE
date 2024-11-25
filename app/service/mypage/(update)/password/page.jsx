import { Header } from '@/components/common';
import PasswordForm from '@/components/mypage/form/PasswordForm';

export default function Page() {
  return (
    <div className="page">
      <Header side="center">내 정보 수정</Header>
      <div className="content">
        <section>
          <PasswordForm />
        </section>
      </div>
    </div>
  );
}
