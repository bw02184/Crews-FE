'use client';

import { Header, Title } from '@/components/common';
import { Box, Flex, Text } from '@radix-ui/themes';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    const timer = setTimeout(() => {
      signOut();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="page">
      <Header>로그아웃</Header>
      <div className="content">
        <section className="height_full">
          <Box align="center">
            <div className="img">
              <Image src="/imgs/img_logout.png" width={130} height={130} alt="로그아웃" />
            </div>
            <Flex direction="column" gap="10px" className="txt_box" mt="3">
              <Title>
                로그인 유지 시간이 만료되어 <i className="dpb"></i>
                자동으로 <span className="underline">로그아웃</span> 되었습니다.
              </Title>
              <Box className="txt_con">
                <Text as="p" size="2" weight="medium">
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
