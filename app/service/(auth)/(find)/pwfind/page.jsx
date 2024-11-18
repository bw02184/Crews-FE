import PwFindForm from '@/components/auth/find/PwFindForm';
import { Header } from '@/components/common';

export default function Page() {
  return (
    <>
      <Header side="center">비밀번호 찾기</Header>
      <div className="content">
        <section>
          <PwFindForm />
        </section>
      </div>
    </>
  );
}
