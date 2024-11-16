'use client';

import { useEffect } from 'react';
import Step from '@/components/auth/signup/Step';
import { ButtonL, Header, Title } from '@/components/common';
import { useNavStore } from '@/stores/layoutStore';
import { Box, Flex, Text } from '@radix-ui/themes';
import Image from 'next/image';

export default function Page() {
  const { setNavVisible } = useNavStore();

  useEffect(() => {
    setNavVisible(false);
    return () => setNavVisible(true);
  }, []);

  return (
    <div className="page">
      <Header>가입완료</Header>
      <div className="content">
        <section>
          <Flex direction="column" gap="60px">
            <Step activeIdx={3} />
            <Box align="center">
              <div className="img">
                <Image src="/imgs/img_complete.png" width={130} height={130} alt="완료" />
              </div>
              <Flex direction="column" gap="10px" className="txt_box" mt="3">
                <Title>가입 완료!</Title>
                <Box className="txt_con">
                  <Text as="p" size="2" weight="medium">
                    회원가입이 완료되었습니다!
                  </Text>
                  <Text as="p" size="2" weight="medium">
                    원활한 서비스 이용을 위해 결제와 이체를 할 때 <i className="dpb"></i> 필요한 PIN 번호를
                    생성해주세요.
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box className="btn_group">
              <ButtonL as="link" href="/service/createPIN" style="deep">
                생성하기
              </ButtonL>
            </Box>
          </Flex>
        </section>
      </div>
    </div>
  );
}
