import IdFindForm from '@/components/auth/find/IdFindForm';
import { Header } from '@/components/common';

export default function Page() {
  return (
    <>
      <Header side="center">아이디 찾기</Header>
      <div className="content">
        <section>
          <IdFindForm />
        </section>
      </div>
    </>
  );
}
