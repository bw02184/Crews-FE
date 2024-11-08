import ButtonL from '@/components/service/common/Button/ButtonL';
import ButtonM from '@/components/service/common/Button/ButtonM';
import ButtonS from '@/components/service/common/Button/ButtonS';
import TabMenu from '@/components/service/common/TabMenu/TabMenu';
import { Box, Checkbox, Flex, RadioGroup, Strong, Text } from '@radix-ui/themes';
import { tabMenuList } from '@/data/tabMenuList/service';
import styles from './page.module.css';
import Header from '@/components/service/common/Header/Header';

export default function Service() {
  return (
    <div>
      <Flex direction="column" gap="10px" className={styles.container}>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <div className={styles.title}>
              <Strong>/components/service/common/Button</Strong>
            </div>
            <div className={styles.content}>
              <Flex direction="column" gap="20px">
                <Box>
                  <Text as="p" weight="medium" mb="2">
                    버튼L
                  </Text>
                  <ButtonL style="deepYellow">버튼1</ButtonL>
                  <ButtonL style="lightYellow">버튼2</ButtonL>
                </Box>
                <Box>
                  <Text as="p" weight="medium" mb="2">
                    버튼M
                  </Text>
                  <ButtonM leftText="M1" rightText="M2" />
                </Box>
                <Box>
                  <Text as="p" weight="medium" mb="2">
                    버튼S
                  </Text>
                  <ButtonS style="deepYellow">s1</ButtonS>
                  <ButtonS style="lightYellow">s2</ButtonS>
                </Box>
              </Flex>
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
        <Flex direction="column" gap="10px" asChild>
          <section>
            <div className={styles.title}>
              <Strong>
                <a href="https://www.radix-ui.com/themes/docs/components/checkbox" target="_blank">
                  Radix Checkbox
                </a>
              </Strong>
            </div>
            <div className={styles.content}>
              <Flex direction="column" gap="2">
                <Box className="checkbox">
                  <Text as="label" size="2">
                    <Flex as="p" gap="2">
                      <Checkbox />
                      <Text as="span" weight="medium">
                        Not checked
                      </Text>
                    </Flex>
                  </Text>
                </Box>
                <Box className="checkbox">
                  <Text as="label" size="2">
                    <Flex as="p" gap="2">
                      <Checkbox defaultChecked />
                      <Text as="span" weight="medium">
                        Checked
                      </Text>
                    </Flex>
                  </Text>
                </Box>
                <Box className="checkbox">
                  <Text as="label" size="2">
                    <Flex as="p" gap="2">
                      <Checkbox disabled />
                      <Text as="span" weight="medium">
                        Not checked
                      </Text>
                    </Flex>
                  </Text>
                </Box>
                <Box className="checkbox">
                  <Text as="label" size="2">
                    <Flex as="p" gap="2">
                      <Checkbox disabled defaultChecked />
                      <Text as="span" weight="medium">
                        Checked
                      </Text>
                    </Flex>
                  </Text>
                </Box>
              </Flex>
            </div>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <div className={styles.title}>
              <Strong>
                <a href="https://www.radix-ui.com/themes/docs/components/radio-group" target="_blank">
                  Radix Radio-group
                </a>
              </Strong>
            </div>
            <div className={styles.content}>
              <Box className="radio_group">
                <RadioGroup.Root size="3" defaultValue="1" name="sample">
                  <Box className="radio">
                    <RadioGroup.Item value="1">Default</RadioGroup.Item>
                  </Box>
                  <Box className="radio">
                    <RadioGroup.Item value="2">Comfortable</RadioGroup.Item>
                  </Box>
                  <Box className="radio">
                    <RadioGroup.Item value="3">Compact</RadioGroup.Item>
                  </Box>
                </RadioGroup.Root>
              </Box>
            </div>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <div className={styles.title}>
              <Strong>/components/service/common/Header</Strong>
            </div>
            <div className={styles.content}>
              <Flex direction="column" gap="20px">
                <Box>
                  <Text as="p" weight="medium" mb="2">
                    side left
                  </Text>
                  <Header side="left">마이페이지</Header>
                </Box>
                <Box>
                  <Text as="p" weight="medium" mb="2">
                    side center
                  </Text>
                  <Header side="center">아지트 생성</Header>
                </Box>
              </Flex>
            </div>
          </section>
        </Flex>
      </Flex>
    </div>
  );
}
