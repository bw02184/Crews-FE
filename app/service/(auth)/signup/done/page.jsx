'use client';

import { Header, Title } from '@/components/common';
import { useNavVisible, useRedirect } from '@/hooks';
import { Box, Flex, Text } from '@radix-ui/themes';
import Image from 'next/image';

export default function Page() {
  useNavVisible(false);
  useRedirect();

  return (
    <div className="page">
      <Header>가입완료</Header>
      <div className="content">
        <section className="height_full">
          <Box align="center">
            <div className="img">
              <Image src="/imgs/img_complete.png" width={130} height={130} alt="완료" />
            </div>
            <Flex direction="column" gap="10px" className="txt_box" mt="3">
              <Title>가입 완료!</Title>
              <Box className="txt_con">
                <Text as="p" size="2" weight="medium">
                  크루즈에 탑승하는데 필요한 모든 설정이 완료되었어요! <i className="dpb"></i>
                  3초 후 홈으로 이동합니다. 잠시만 기다려주세요.
                </Text>
              </Box>
            </Flex>
          </Box>
        </section>
      </div>
    </div>
  );
}
