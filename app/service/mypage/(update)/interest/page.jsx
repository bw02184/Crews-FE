import { Header } from '@/components/common';
import InterestForm from '@/components/mypage/interest/InterestForm';

export default function page() {
  return (
    <div className="page">
      <Header side="center">관심사 수정</Header>
      <div className="content">
        <section>
          <InterestForm />
        </section>
      </div>
    </div>
  );
}
