import ButtonL from '@/components/service/common/Button/ButtonL';
import ButtonM from '@/components/service/common/Button/ButtonM';
import ButtonS from '@/components/service/common/Button/ButtonS';
import TabMenu from '@/components/service/common/TabMenu/TabMenu';
import { Box, Flex, Strong, Text } from '@radix-ui/themes';
import { tabMenuList } from '@/data/tabMenuList/service';
import styles from './page.module.css';

export default function Service() {
  return (
    <div>
      <h1>서비스 페이지</h1>
      <Flex direction="column" gap="10px" className={styles.container}>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <div className={styles.title}>
              <Strong>/components/service/common/Button</Strong>
            </div>
            <div className={styles.content}>
              <Box>
                <Text as="p">버튼L</Text>
                <ButtonL style="deepYellow">버튼1</ButtonL>
                <ButtonL style="lightYellow">버튼2</ButtonL>
              </Box>
              <Box>
                <Text as="p">버튼M</Text>
                <ButtonM leftText="M1" rightText="M2" />
              </Box>
              <Box>
                <Text as="p">버튼S</Text>
                <ButtonS style="deepYellow">s1</ButtonS>
                <ButtonS style="lightYellow">s2</ButtonS>
              </Box>
            </div>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <div className={styles.title}>
              <Strong>/components/service/common/TabMenu</Strong>
            </div>
            <div className={styles.content}>
              <TabMenu tabMenuList={tabMenuList} />
            </div>
          </section>
        </Flex>
      </Flex>
    </div>
  );
}
