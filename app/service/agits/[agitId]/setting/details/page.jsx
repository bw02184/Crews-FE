import { Header, Title } from '@/components/common';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';
import { Box, Flex } from '@radix-ui/themes';

import ProfileCardList from '@/components/agits/ProfileCardList';

export default function Page({ params }) {
  const [agits] = agitsSelectMenuList.filter((select) => select.id == params.agitId);

  return (
    <div className="page">
      <Header side="center">{`${agits.text} 멤버`}</Header>
      <Box className="content">
        <section>
          <Flex direction="column">
            <Flex justify="between" align="center" wrap="wrap">
              <Title>{`총 ${agits.id}명`} </Title>
            </Flex>
            <Flex>
              <ul>
                <ProfileCardList status="account" />
                <ProfileCardList status="account" />
                <ProfileCardList status="account" />
              </ul>
            </Flex>
          </Flex>
        </section>
      </Box>
    </div>
  );
}
