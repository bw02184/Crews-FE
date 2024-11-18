import LoginForm from '@/components/auth/LoginForm';
import { Header } from '@/components/common';

export default function Page() {
  return (
    <div className="page">
      <Header>로그인</Header>
      <div className="content">
        <section>
          <LoginForm />
        </section>
      </div>
    </div>
  );
}
