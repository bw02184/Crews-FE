import { Header } from '@/components/common';
import InterestForm from '@/components/mypage/interest/InterestForm';
import { Section } from '@radix-ui/themes';

export default function page() {
  return (
    <div className="page">
      <Header side="center">관심사 수정</Header>
      <div className="content">
        <Section>
          <InterestForm />
        </Section>
      </div>
    </div>
  );
}
