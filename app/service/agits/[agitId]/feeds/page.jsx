import { Box, Flex, Text } from '@radix-ui/themes';
import { SelectFilter, TabMenu, Title, ButtonS, Label } from '@/components/common';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';
import { tabMenuList } from '@/constants/tabMenuList/agits';
import styles from './page.module.css';
import { feeds } from '@/constants/dummy';
import Link from 'next/link';
import Image from 'next/image';
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
      <Flex direction="column" gap="10px" className="content">
        <section>
          <Flex direction="column" gap="20px">
            <Flex justify="between">
              <Title>활동 기록</Title>
              <ButtonS style="deep">등록하기</ButtonS>
            </Flex>
            <Box className={styles.feed_list}>
              <Flex gap="10px" wrap="wrap" asChild>
                <ul>
                  {feeds.map((feed, index) => (
                    <li key={`feed${index}`}>
                      <Link href={`/service/agits/feeds/${feed?.id}`}>
                        <Flex direction="column" gap="10px">
                          <Box>
                            <Image
                              src={'/imgs/img_bg_feed.jpg'}
                              width={190}
                              height={147}
                              alt={`${feed.title} 이미지`}
                            />
                          </Box>
                          <Flex direction="column" gap="5px">
                            <Flex justify="between" wrap="wrap">
                              <em>2024.11.07</em>
                              <Label style="light">홍길동</Label>
                            </Flex>
                            <Text as="p" size="1" weight="medium" className="gray_t1">
                              이러쿵저러쿵요러쿵좋았던내용...
                            </Text>
                          </Flex>
                        </Flex>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Flex>
            </Box>
          </Flex>
        </section>
      </Flex>
    </div>
  );
}
