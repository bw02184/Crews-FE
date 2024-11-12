import { getPosts } from '@/apis/sampleAPI';
import { ButtonL, ButtonM } from '@/components/common';
import PostsList from '@/components/sample/PostsList';
import { Box, Text } from '@radix-ui/themes';

export default async function Page() {
  const response = await getPosts();
  if (response?.error) {
    throw new Error(response.error);
  }

  return (
    <Box>
      <PostsList posts={response} />
      <Box mt="3">
        <ButtonM rightButton={{ as: 'link', href: '/sample/write', text: '작성하기' }} />
      </Box>
    </Box>
  );
}
