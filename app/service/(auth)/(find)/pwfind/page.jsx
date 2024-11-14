import PwFindForm from '@/components/auth/find/PwFindForm';
import PwFindResult from '@/components/auth/find/PwFindResult';
import { Header } from '@/components/common';

export default function Page() {
  return (
    <div className="page">
      <Header side="center">비밀번호 찾기</Header>
      <div className="content">
        <section>
          {/* <PwFindForm /> */}
          <PwFindResult></PwFindResult>
        </section>
      </div>
    </div>
  );
}
