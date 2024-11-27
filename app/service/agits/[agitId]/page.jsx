import { ButtonL, ButtonM, ImageCard, SelectFilter, TabMenu, Title } from '@/components/common';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';
import { Box, Callout, Flex, Text } from '@radix-ui/themes';
import styles from './page.module.css';
import Image from 'next/image';

import { feeds, events } from '@/constants/dummy';
import { tabMenuList } from '@/constants/tabMenuList/agits';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import Account from '@/components/agits/Account/Account';
import { getAccount, getCommonDues, getRole } from '@/apis/agitsAPI';
import Link from 'next/link';
import NoAccount from '@/components/agits/Account/NoAccount';

export default async function Page({ params }) {
  const role = await getRole(params.agitId);
  const dues = await getCommonDues(params.agitId);
  const [agits] = agitsSelectMenuList.filter((select) => select.id == params.agitId);
  const data = await getAccount(params.agitId);

  return (
    <div className="page">
      <header>
        <Box>
          <SelectFilter isHeader={true} as="link" pathname="/service/agits" selectList={agitsSelectMenuList}>
            {agits?.text}
          </SelectFilter>
        </Box>
        <TabMenu tabMenuList={tabMenuList} baseUrl={`/service/agits/${params.agitId}`} />
      </header>

      <Flex direction="column" gap="10px" className="content">
        <section>
          <Flex direction="column" gap="20px">
            {role === 'MEMBER' && (
              <>
                {dues.dueAmount !== 0.0 ? (
                  <Callout.Root color="red">
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>{`회비 납부일이 지났어요! 빨리 ${dues.dueAmount.toLocaleString('ko-KR')}원을 납부해주세요.`}</Callout.Text>
                  </Callout.Root>
                ) : (
                  ''
                )}

                <Callout.Root color="green">
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>{`매월 ${dues.dueDay}일은 모임 회비를 납부하는 날입니다.`}</Callout.Text>
                </Callout.Root>
              </>
            )}
          </Flex>
          {role === 'LEADER' ? (
            <Flex direction="column" gap="20px">
              <Title>모임통장</Title>
              {data.ci == null ? <NoAccount></NoAccount> : <Account data={data} hide={true} />}
              <ButtonM
                leftButton={{ text: '권한 요청하기' }}
                rightButton={{ text: '상세 내역보기', as: 'link', href: `/service/agits/${params.agitId}/accounts` }}
              />
            </Flex>
          ) : (
            ''
          )}
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
                      <Link href={`/service/agits/feeds/${feed?.id}`}>
                        <Image src={'/imgs/img_bg_feed.jpg'} width={190} height={190} alt={`${feed.title} 이미지`} />
                      </Link>
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
