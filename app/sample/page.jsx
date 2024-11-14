import { getPosts } from '@/apis/sampleAPI';
import PostsList from '@/components/sample/PostsList';

export default async function Page() {
  // 초기 데이터를 sampleAPI를 통해서 ssr로 받아옴
  const initData = await getPosts();

  // ssr에서 에러 처리
  if (initData?.error) {
    throw new Error(initData.error);
  }

  return <PostsList initData={initData} />;
}
