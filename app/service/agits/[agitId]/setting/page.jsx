import { ButtonL, SelectFilter, TabMenu, Title } from '@/components/common';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';
import { tabMenuList } from '@/constants/tabMenuList/agits';
import { Box, Flex, Text } from '@radix-ui/themes';
import ProfileCardList from '@/components/agits/ProfileCardList';

export default function Page({ params }) {
  const [agits] = agitsSelectMenuList.filter((select) => select.id == params.agitId);

  return (
    <div className="page">
      <header>
        <Box>
          <SelectFilter isHeader={true} as="link" pathname="/service/agits" selectList={agitsSelectMenuList}>
            {agits?.text}
          </SelectFilter>
        </Box>
        <TabMenu tabMenuList={tabMenuList} baseUrl={`/service/agits/${params.agitId}`} />
      </header>
      <Flex direction="column" gap="10px" className="content">
        <section>
          <Flex direction="column" gap="20px">
            <Flex justify="between" align="center" wrap="wrap">
              <Title>멤버</Title>
              <Text as="p" size="2" weight="medium" className="gray_t1">
                {`${agits.id}`}명
              </Text>
            </Flex>

            <ProfileCardList status="account" />

            <Flex direction="column" gap="10px">
              <ButtonL as="link" href="/service/agits/1/setting/details" style="deep" size="3">
                더보기
              </ButtonL>

              <Text align="center" size="2" className="gray_t2">
                아지트 탈퇴
              </Text>
            </Flex>
          </Flex>
        </section>

        <section>
          <Flex direction="column" gap="20px">
            <Flex justify="between" align="center" wrap="wrap">
              <Title>가입신청</Title>
              <Text as="p" size="2" weight="medium" className="gray_t1">
                {`${agits.id}`}명
              </Text>
            </Flex>
            <ProfileCardList status="member" />
            <Flex direction="column" gap="10px">
              <ButtonL as="link" href="/service/agits/1/setting/approve" style="deep" size="3">
                더보기
              </ButtonL>
              <Text align="center" size="2" className="gray_t2">
                아지트 해체
              </Text>
            </Flex>
          </Flex>
        </section>
      </Flex>
    </div>
  );
}
