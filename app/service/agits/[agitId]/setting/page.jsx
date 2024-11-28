import { ButtonL, Title } from '@/components/common';
import { Flex, Text } from '@radix-ui/themes';
import ProfileCardList from '@/components/agits/ProfileCardList';
import AgitHeader from '@/components/agits/AgitHeader';

export default function Page({ params }) {
  return (
    <div className="page">
      <AgitHeader currentId={params.agitId} />
      <Flex direction="column" gap="10px" className="content">
        <section>
          <Flex direction="column" gap="20px">
            <Flex justify="between" align="center" wrap="wrap">
              <Title>멤버</Title>
              <Text as="p" size="2" weight="medium" className="gray_t1">
                3명
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
                5명
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
