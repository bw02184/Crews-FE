import { Table } from '@radix-ui/themes';

export default function PostsList({ posts }) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>TITLE</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>CONTENT</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {posts.map((post, i) => {
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
  );
}
