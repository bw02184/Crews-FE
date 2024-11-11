import { getPosts } from '@/apis/sampleAPI';
import Link from 'next/link';

export default async function Page() {
  const response = await getPosts();
  console.log(response);

  return (
    <div>
      <Link href="/sample/write">작성하기</Link>
    </div>
  );
}
