import { ButtonM, Header, Title } from '@/components/common';
import { Box, Flex, Text } from '@radix-ui/themes';
import Image from 'next/image';
import styles from '@/app/service/agits/create/done/page.module.css';

export default async function Page() {
  return (
    <div className="page">
      <Header side="left">생성 완료</Header>
      <div className="content">
        <Flex direction="column" gap="10px" className="content">
          <Flex direction="column" gap="20px" asChild align="center">
            <section>
              <Box>
                <Image src="/imgs/img_complete.png" width={130} height={130} alt={`완료 이미지`} />
              </Box>
              <Box content="text" align="center">
                <Box>
                  <Title>아지트 생성 완료!</Title>
                </Box>
                <Box className=" gray_t1">
                  <Text as="p" weight="medium" size="14px">
                    모임 통장을 지금 개설하시겠습니까? <i className="dpb"></i> ※ 이미 사용중인 계좌 연결은 아지트 홈에서
                    가능합니다.
                  </Text>
                </Box>
              </Box>
              <Box content="button" className={styles.buttons}>
                <ButtonM
                  leftButton={{ as: 'link', text: '나중에', href: `/service/agits` }}
                  rightButton={{ as: 'link', text: '생성하기', href: `/service/agits` }}
                />
              </Box>
            </section>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
