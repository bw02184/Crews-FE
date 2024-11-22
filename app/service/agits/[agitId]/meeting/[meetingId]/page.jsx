import { SelectFilter, TabMenu, Title, ButtonL } from '@/components/common';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';
import { Box, Flex, Text } from '@radix-ui/themes';
import { tabMenuList } from '@/constants/tabMenuList/agits';

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
        <TabMenu tabMenuList={tabMenuList} dynamicID={params.agitId} />
      </header>
      <Box className="content">
        <section>
          <Flex direction="column" gap="20px">
            <Title>sample1</Title>
            <ButtonL style="light">수정하기</ButtonL>
            <Box className="img_box">
              <div className="img">
                <img src="/imgs/0U9A1445.jpg" />
              </div>
            </Box>
            <Box className="info_list">
              <Flex direction="column" gap="10px" asChild>
                <ul>
                  <li>
                    <em>모임일시</em>
                    <Text as="p" size="2" weight="medium" className="gray_t1">
                      2024.12.01 7:00 PM
                    </Text>
                  </li>
                  <li>
                    <em>모임위치</em>
                    <Text as="p" size="2" weight="medium" className="gray_t1">
                      서울특별시 마포구 상암동 월드컵북로 434 상암IT타워 6층 우리 FISA CLASS 3
                    </Text>
                  </li>
                  <li>
                    <em>안내사항</em>
                    <Text as="p" size="2" weight="medium" className="gray_t1">
                      이날은 이런걸 할거고요 저런걸 할겁니다. 비가 올 것 같으니까 우산을 챙겨오세요.
                    </Text>
                  </li>
                </ul>
              </Flex>
            </Box>
          </Flex>
        </section>
      </Box>
    </div>
  );
}
