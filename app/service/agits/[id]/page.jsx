import { ButtonL, ImageCard, SelectFilter, TabMenu, Title } from '@/components/common';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';
import { Box, Flex } from '@radix-ui/themes';
import styles from './page.module.css';
import Image from 'next/image';

import { feeds, events } from '@/constants/dummy';
import { tabMenuList } from '@/constants/tabMenuList/agits';

export default function Page({ params }) {
  const [agits] = agitsSelectMenuList.filter((select) => select.id == params.id);

  return (
    <div className="page">
      <header>
        <Box className={styles.filter}>
          <SelectFilter isHeader={true} as="link" pathname="/service/agits" selectList={agitsSelectMenuList}>
            {agits?.text}
          </SelectFilter>
        </Box>
        <TabMenu tabMenuList={tabMenuList} dynamicID={params.id} />
      </header>
      <Flex direction="column" gap="10px" className="content">
        <section>
          <Flex direction="column" gap="20px">
            <Title>최근정모</Title>
            <Flex direction="column" gap="20px">
              <Box>
                <Flex direction="column" gap="10px">
                  {events.map((event, i) => {
                    return <ImageCard type="event" data={event} key={`event${i}`}></ImageCard>;
                  })}
                </Flex>
              </Box>
            </Flex>
            <ButtonL style="deep">정기모임 보러가기</ButtonL>
          </Flex>
        </section>
        <section>
          <Flex direction="column" gap="20px">
            <Title>최근기록</Title>
            <Box className={styles.feed_list}>
              <Flex gap="10px" wrap="wrap" asChild>
                <ul>
                  {feeds.map((feed, index) => (
                    <li className="back_img" style={{ backgroundImage: `url(${feed?.image})` }} key={`feed${index}`}>
                      <Image src={'/imgs/img_bg_feed.jpg'} width={190} height={190} alt={`피드 이미지 ${index + 1}`} />
                    </li>
                  ))}
                </ul>
              </Flex>
            </Box>
            <ButtonL style="deep">활동기록 보러가기</ButtonL>
          </Flex>
        </section>
      </Flex>
    </div>
  );
}
