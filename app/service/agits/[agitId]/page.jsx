import { ButtonL, ImageCard, Title } from '@/components/common';
import { Box, Flex } from '@radix-ui/themes';
import styles from './page.module.css';
import Image from 'next/image';
import { feeds, events } from '@/constants/dummy';
import { getAccount, getDues } from '@/apis/agitsAPI';
import Link from 'next/link';
import AccountAndHeader from '@/components/agits/Account/AccountAndHeader';

export default async function Page({ params }) {
  const dues = await getDues(params.agitId);
  if (dues?.errorCode) {
    throw new Error(dues.message);
  }
  const data = await getAccount(params.agitId);
  if (data?.errorCode) {
    throw new Error(data.message);
  }
  return (
    <div className="page">
      <AccountAndHeader agitId={params.agitId} dues={dues} data={data}></AccountAndHeader>
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
