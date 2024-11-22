'use client';

import { ImageCard, SelectFilter, TabMenu, Title, ButtonS } from '@/components/common';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';
import { Box, Flex } from '@radix-ui/themes';
import { tabMenuList } from '@/constants/tabMenuList/agits';
// import { events } from '@/constants/dummy';
// import { getAccount } from '@/apis/agitsAPI';

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
                    image: '/imgs/0U9A1445.jpg',
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
                    image: '/imgs/0U9A1445.jpg',
                    introduction: 'This is a sample2 meeting.',
                    place: 'Seoul',
                    date: '2025-01-01',
                  }}
                  dynamicId={1}
                  onClick={() => console.log('sample2 clicked!')}
                />
                <ImageCard
                  type="meeting"
                  data={{
                    id: 103,
                    name: 'Sample3',
                    image: '/imgs/0U9A1445.jpg',
                    introduction: 'This is a sample3 meeting.',
                    place: 'Seoul',
                    date: '2025-02-01',
                  }}
                  dynamicId={1}
                  onClick={() => console.log('sample3 clicked!')}
                />
                <ImageCard
                  type="meeting"
                  data={{
                    id: 104,
                    name: 'Sample4',
                    image: '/imgs/0U9A1445.jpg',
                    introduction: 'This is a sample4 meeting.',
                    place: 'Seoul',
                    date: '2025-03-01',
                  }}
                  dynamicId={1}
                  onClick={() => console.log('sample4 clicked!')}
                />
                <ImageCard
                  type="meeting"
                  data={{
                    id: 105,
                    name: 'Sample5',
                    image: '/imgs/0U9A1445.jpg',
                    introduction: 'This is a sample5 meeting.',
                    place: 'Seoul',
                    date: '2025-04-01',
                  }}
                  dynamicId={1}
                  onClick={() => console.log('sample5 clicked!')}
                />
                <ImageCard
                  type="meeting"
                  data={{
                    id: 106,
                    name: 'Sample6',
                    image: '/imgs/0U9A1445.jpg',
                    introduction: 'This is a sample6 meeting.',
                    place: 'Seoul',
                    date: '2025-05-01',
                  }}
                  dynamicId={1}
                  onClick={() => console.log('sample6 clicked!')}
                />
                <ImageCard
                  type="meeting"
                  data={{
                    id: 107,
                    name: 'Sample7',
                    image: '/imgs/0U9A1445.jpg',
                    introduction: 'This is a sample7 meeting.',
                    place: 'Seoul',
                    date: '2026-04-01',
                  }}
                  dynamicId={1}
                  onClick={() => console.log('sample7 clicked!')}
                />
                <ImageCard
                  type="meeting"
                  data={{
                    id: 108,
                    name: 'Sample8',
                    image: '/imgs/0U9A1445.jpg',
                    introduction: 'This is a sample8 meeting.',
                    place: 'Seoul',
                    date: '2027-02-01',
                  }}
                  dynamicId={1}
                  onClick={() => console.log('sample8 clicked!')}
                />
                <ImageCard
                  type="meeting"
                  data={{
                    id: 109,
                    name: 'Sample9',
                    image: '/imgs/0U9A1445.jpg',
                    introduction: 'This is a sample9 meeting.',
                    place: 'Seoul',
                    date: '2027-12-01',
                  }}
                  dynamicId={1}
                  onClick={() => console.log('sample9 clicked!')}
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
