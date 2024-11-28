import { Header, Title } from '@/components/common';
import { Box, Flex } from '@radix-ui/themes';

import ProfileCardList from '@/components/agits/ProfileCardList';

export default function Page() {
  return (
    <div className="page">
      <Header side="center">아지트 멤버</Header>
      <Box className="content">
        <section>
          <Flex direction="column" gap="20px">
            <Title>총 5명</Title>
            <ProfileCardList status="member" />
          </Flex>
        </section>
      </Box>
    </div>
  );
}
