import { getPosts } from '@/apis/sampleAPI';
import PostsList from '@/components/sample/PostsList';
import { Box, Text } from '@radix-ui/themes';
import Link from 'next/link';

export default async function Page() {
  const response = await getPosts();
  if (response?.error) {
    throw new Error(response.error);
  }

  return (
    <Box>
      <PostsList posts={response} />
      <Text as="p" align="right" mt="3">
        <Link href="/sample/write">작성하기</Link>
      </Text>
    </Box>
  );
}
