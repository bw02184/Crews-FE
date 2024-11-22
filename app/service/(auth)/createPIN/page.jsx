import { Header, Title } from '@/components/common';
import { Box, Flex, Text } from '@radix-ui/themes';
import PinNumber from '@/components/common/PinNumber/PinNumber';
import { Suspense } from 'react';

export default function Page({ searchParams }) {
  return (
    <div className="page">
      <Header side="center">PIN번호 생성</Header>
      <div className="content">
        <section>
          <Flex direction="column" gap="20px">
            <Flex direction="column" gap="10px" className="txt_box">
              <Title>
                {(searchParams.stage == 'create' || searchParams.stage == undefined) && (
                  <>
                    크루즈 내에서 사용할 <span className="underline">PIN번호를 생성</span>해주세요.
                  </>
                )}
                {(searchParams.stage == 'confirm' || searchParams.stage == 'error') && (
                  <>
                    생성한 PIN 번호를 <span className="underline">다시 한 번 입력</span>해주세요.
                  </>
                )}
              </Title>
              <Box className="txt_con">
                <Text as="p" size="2" weight="medium">
                  {(searchParams.stage == 'create' || searchParams.stage == undefined) && (
                    <>
                      모임 카드로 결제를 하거나 모임 통장에 이체를 할 때 사용할 <i className="dpb"></i>
                      PIN 번호를 생성합니다. 연속된 숫자나 의미있는 조합은 피해주세요.
                    </>
                  )}
                  {(searchParams.stage == 'confirm' || searchParams.stage == 'error') && <>정확히 일치해야 합니다.</>}
                </Text>
              </Box>
            </Flex>
            <Suspense>
              <PinNumber defaultParams={'create'} />
            </Suspense>
          </Flex>
        </section>
      </div>
    </div>
  );
}
