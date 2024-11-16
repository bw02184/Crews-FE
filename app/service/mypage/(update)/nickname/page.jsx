import { Header } from '@/components/common';
import NicknameForm from '@/components/mypage/nickname/NicknameForm';
import { Section } from '@radix-ui/themes';

export default function page() {
  return (
    <div className="page">
      <Header side="center">닉네임 수정</Header>
      <div className="content">
        <Section>
          <NicknameForm />
        </Section>
      </div>
    </div>
  );
}
