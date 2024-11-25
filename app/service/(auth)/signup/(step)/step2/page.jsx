import Step from '@/components/auth/signup/Step';
import { Box, Flex, Text } from '@radix-ui/themes';
import { AddressPostcode, Title } from '@/components/common';

export default function Page() {
  return (
    <>
      <section>
        <Flex direction="column" gap="20px">
          <Step activeIdx={2} />
          <Flex direction="column" gap="10px" className="txt_box">
            <Title>
              회원님의 <span className="underline">활동지역</span>은 어디인가요?
            </Title>
            <Box className="txt_con">
              <Text as="p" size="2" weight="medium">
                주로 활동하는 지역(집, 회사, 학교 등)을 최대 3개까지 <i className="dpb"></i> 설정할 수 있습니다.
                회원님에게 딱 맞는 모임을 추천해드려요.
              </Text>
            </Box>
          </Flex>
          <AddressPostcode status="signup" />
        </Flex>
      </section>
    </>
  );
}
