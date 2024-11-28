'use client';

import { ImageCard, Title, ButtonS } from '@/components/common';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';
import { Box, Flex } from '@radix-ui/themes';
import AgitHeader from '@/components/agits/AgitHeader';

export default function Page({ params }) {
  const [agits] = agitsSelectMenuList.filter((select) => select.id == params.agitId);

  return (
    <div className="page">
      <AgitHeader currentId={params.agitId} />
      <Flex direction="column" gap="10px" className="content">
        <section>
          <Flex direction="column" gap="20px">
            <Flex justify="between">
              <Title>정기 모임</Title>
              <ButtonS style="deep">등록하기</ButtonS>
            </Flex>
            <Box>
              <Flex direction="column" gap="10px">
                <ImageCard
                  type="meeting"
                  data={{
                    id: 101,
                    name: 'Sample1',
                    image: '/dev/img_introduce.jpg',
                    introduction: 'This is a sample1 meeting.',
                    place: 'Seoul',
                    date: '2024-12-01',
                  }}
                  dynamicId={agits.id}
                />
                <ImageCard
                  type="meeting"
                  data={{
                    id: 102,
                    name: 'Sample2',
                    image: '/dev/img_introduce.jpg',
                    introduction: 'This is a sample2 meeting.',
                    place: 'Seoul',
                    date: '2025-01-01',
                  }}
                  dynamicId={agits.id}
                />
                <ImageCard
                  type="meeting"
                  data={{
                    id: 103,
                    name: 'Sample3',
                    image: '/dev/img_introduce.jpg',
                    introduction: 'This is a sample3 meeting.',
                    place: 'Seoul',
                    date: '2025-02-01',
                  }}
                  dynamicId={agits.id}
                />
                <ImageCard
                  type="meeting"
                  data={{
                    id: 104,
                    name: 'Sample4',
                    image: '/dev/img_introduce.jpg',
                    introduction: 'This is a sample4 meeting.',
                    place: 'Seoul',
                    date: '2025-03-01',
                  }}
                  dynamicId={agits.id}
                />
                <ImageCard
                  type="meeting"
                  data={{
                    id: 105,
                    name: 'Sample5',
                    image: '/dev/img_introduce.jpg',
                    introduction: 'This is a sample5 meeting.',
                    place: 'Seoul',
                    date: '2025-04-01',
                  }}
                  dynamicId={agits.id}
                />
                <ImageCard
                  type="meeting"
                  data={{
                    id: 106,
                    name: 'Sample6',
                    image: '/dev/img_introduce.jpg',
                    introduction: 'This is a sample6 meeting.',
                    place: 'Seoul',
                    date: '2025-05-01',
                  }}
                  dynamicId={agits.id}
                />
                <ImageCard
                  type="meeting"
                  data={{
                    id: 107,
                    name: 'Sample7',
                    image: '/dev/img_introduce.jpg',
                    introduction: 'This is a sample7 meeting.',
                    place: 'Seoul',
                    date: '2026-04-01',
                  }}
                  dynamicId={agits.id}
                />
                <ImageCard
                  type="meeting"
                  data={{
                    id: 108,
                    name: 'Sample8',
                    image: '/dev/img_introduce.jpg',
                    introduction: 'This is a sample8 meeting.',
                    place: 'Seoul',
                    date: '2027-02-01',
                  }}
                  dynamicId={agits.id}
                />
                <ImageCard
                  type="meeting"
                  data={{
                    id: 109,
                    name: 'Sample9',
                    image: '/dev/img_introduce.jpg',
                    introduction: 'This is a sample9 meeting.',
                    place: 'Seoul',
                    date: '2027-12-01',
                  }}
                  dynamicId={agits.id}
                />
              </Flex>
            </Box>
            {/* <Box>
              <Flex direction="column" gap="10px">
                {events.map((event, i) => {
                  return <ImageCard type="event" data={event} key={`event${i}`}></ImageCard>;
                })}
              </Flex>
            </Box> */}
          </Flex>
        </section>
      </Flex>
    </div>
  );
}
