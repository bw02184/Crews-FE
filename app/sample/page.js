import { getSample } from '@/apis/sampleAPI';

export default async function Page() {
  const response = await getSample();
  console.log(response);

  return <div>샘플페이지</div>;
}
