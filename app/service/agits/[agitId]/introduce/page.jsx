import { Label, Title, ButtonL } from '@/components/common';
import { Box, Flex, Text } from '@radix-ui/themes';
import AgitHeader from '@/components/agits/AgitHeader';

export default async function Page({ params }) {
  return (
    <div className="page">
      <AgitHeader currentId={params.agitId} />
      <Box className="content">
        <section>
          <Flex direction="column" gap="20px">
            <Box className="title_btn">
              <Title>어쩌고저쩌고 아지트명</Title>
              <div className="right_top">
                <Label style="lime">반려동물</Label>
              </div>
            </Box>
            <Flex direction="column" gap="20px">
              <Box className="img_box">
                <div className="img">
                  <img src="/dev/img_introduce.jpg" />
                </div>
              </Box>
              <Flex direction="column" gap="20px">
                <Box className="info_list">
                  <Flex direction="column" gap="10px" asChild>
                    <ul>
                      <li>
                        <em>한줄 소개</em>
                        <Text as="p" size="2" weight="medium" className="gray_t1">
                          어쩌고저쩌고가나다라마바사아자차
                        </Text>
                      </li>
                      <li>
                        <em>모임 특징</em>
                        <Text as="p" size="2" weight="medium" className="gray_t1">
                          우리는 이런것도 하고 저런것도 하고 이래저래 어쩌고저쩌고 빙글빙글 얼렁뚱땅 천방지축
                        </Text>
                      </li>
                    </ul>
                  </Flex>
                </Box>
                <Flex wrap="wrap" gap="10px" asChild>
                  <ul>
                    <li>
                      <Label style="deep">#df</Label>
                    </li>
                    <li>
                      <Label style="deep">#dd</Label>
                    </li>
                    <li>
                      <Label style="deep">#ds</Label>
                    </li>
                    <li>
                      <Label style="deep">#adbbes</Label>
                    </li>
                    <li>
                      <Label style="deep">#djeppsenvs</Label>
                    </li>
                    <li>
                      <Label style="deep">#ab</Label>
                    </li>
                  </ul>
                </Flex>
                <ButtonL style="deep">수정하기</ButtonL>
              </Flex>
            </Flex>
          </Flex>
        </section>
      </Box>
    </div>
  );
}
