import MeetingForm from '@/components/agits/MeetingForm';
import { Header } from '@/components/common';
import { Flex } from '@radix-ui/themes';

export default function Page() {
  return (
    <div className="page">
      <Header side="center">정기모임 수정</Header>
      <Flex direction="column" gap="20px" className="content">
        <section>
          <MeetingForm status="edit" />
        </section>
      </Flex>
    </div>
  );
}
