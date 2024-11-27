import MeetingForm from '@/components/agits/MeetingForm';
import { Header } from '@/components/common';
import { Flex } from '@radix-ui/themes';

export default function Page() {
  return (
    <div className="page">
      <Header side="center">정기모임 등록</Header>
      <Flex direction="column" gap="20px" className="content">
        <section>
          <MeetingForm status="create" />
        </section>
      </Flex>
    </div>
  );
}
