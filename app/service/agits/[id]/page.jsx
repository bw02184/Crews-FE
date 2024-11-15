import { ButtonL, ButtonM, ImageCard, SelectFilter, TabMenu, Title } from '@/components/common';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';
import { Box, Callout, Flex } from '@radix-ui/themes';
import styles from './page.module.css';
import Image from 'next/image';

import { accounts, feeds, events } from '@/constants/dummy';
import { tabMenuList } from '@/constants/tabMenuList/agits';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import Account from '@/components/Account/Account';
import { getData } from '@/apis/accountsAPI';

export default async function Page({ params }) {
  const [agits] = agitsSelectMenuList.filter((select) => select.id == params.id);
  const data = await getData(params.id);
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
          <section>
            <Flex direction="column" gap="20px">
              <Callout.Root color="red">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>회비 납부일이 지났어요! 빨리 0만원을 납부해주세요.</Callout.Text>
              </Callout.Root>

              <Callout.Root color="green">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>매월 1일은 모임 회비를 납부하는 날입니다.</Callout.Text>
              </Callout.Root>
            </Flex>
          </section>
          <section>
            <Flex direction="column" gap="20px">
              <Title>모임통장</Title>
              <Account accounts={data} />
              <ButtonM leftButton={{ text: '권한 요청하기' }} rightButton={{ text: '상세 내역보기' }} />
            </Flex>
          </section>
        </section>
      </Flex>

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
