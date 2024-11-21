import { Label, SelectFilter, TabMenu, Title } from '@/components/common';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';
import { Box, Flex, Text } from '@radix-ui/themes';
import styles from './page.module.css';
import { tabMenuList } from '@/constants/tabMenuList/agits';

export default async function Page({ params }) {
  const [agits] = agitsSelectMenuList.filter((select) => select.id == params.id);
  return (
    <div className="page">
      <header>
        <Box>
          <SelectFilter isHeader={true} as="link" pathname="/service/agits" selectList={agitsSelectMenuList}>
            {agits?.text}
          </SelectFilter>
        </Box>
        <TabMenu tabMenuList={tabMenuList} dynamicID={params.id} />
      </header>
      <Flex direction="column" gap="10px" className="content">
        <section>
          <Flex direction="column" gap="20px">
            <Flex justify="between">
              <Title>어쩌고저쩌고 아지트명</Title>
              <Label style="lime">반려동물</Label>
            </Flex>
            <Flex direction="column" gap="20px">
              <Box className="img_box">
                <div className="img">
                  <img src="/dev/img_introduce.jpg" />
                </div>
              </Box>
              <Flex direction="column" gap="20px">
                <Box className={styles.txt_box}>
                  <ul>
                    <Flex asChild>
                      <li>
                        <em>한줄 소개</em>
                        <Text as="p" size="2" weight="medium" className="gray_t1">
                          어쩌고저쩌고가나다라마바사아자차
                        </Text>
                      </li>
                    </Flex>
                    <Flex asChild>
                      <li>
                        <em>모임 특징</em>
                        <Text as="p" size="2" weight="medium" className="gray_t1">
                          우리는 이런것도 하고 저런것도 하고 이래저래 어쩌고저쩌고 빙글빙글 얼렁뚱땅 천방지축
                        </Text>
                      </li>
                    </Flex>
                  </ul>
                </Box>
                <Flex style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <Label style="deep">#df</Label>
                  <Label style="deep">#dd</Label>
                  <Label style="deep">#ds</Label>
                  <Label style="deep">#adbbes</Label>
                  <Label style="deep">#djeppsenvs</Label>
                  <Label style="deep">#ab</Label>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </section>
      </Flex>
    </div>
  );
}
