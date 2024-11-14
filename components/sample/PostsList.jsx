'use client';

import { Box, Table } from '@radix-ui/themes';
import { ButtonM } from '../common';
import useSWR from 'swr';
import instance from '@/apis/instance';

export default function PostsList({ initData }) {
  // ssr로 받아온 초기 데이터를 swr의 fallbackData에 넣어서 캐싱 처리
  const { data, error, mutate } = useSWR('posts', () => instance.get('posts'), {
    fallbackData: initData,
  });

  // csr에서 에러 처리
  if (error) {
    throw new Error(error.message);
  }

  return (
    <Box>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>TITLE</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>CONTENT</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((post, i) => {
            return (
              <Table.Row key={`post${i}`}>
                <Table.RowHeaderCell>{post.id}</Table.RowHeaderCell>
                <Table.Cell>{post.title}</Table.Cell>
                <Table.Cell>{post.content}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      <Box mt="3">
        {/* 갱신 버튼을 누르면 useSWR이 트리거되면서 최근 데이터 로드 */}
        <ButtonM
          leftButton={{ onClick: () => mutate(), text: '데이터 갱신하기' }}
          rightButton={{ as: 'link', href: '/sample/write', text: '작성하기' }}
        />
      </Box>
    </Box>
  );
}
