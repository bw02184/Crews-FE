import { Header } from '@/components/common';
import InterestForm from '@/components/mypage/form/InterestForm';
import { getAllInterests, getInterests } from '@/apis/mypageAPI';

export default async function Page() {
  const interestData = await getInterests();
  // console.log('API 응답:', interestData);
  if (interestData?.error) {
    throw new Error(interestData.error);
  }

  const subjectsData = await getAllInterests();
  // console.log('API 응답:', subjectsData);
  if (subjectsData?.error) {
    throw new Error(subjectsData.error);
  }

  return (
    <div className="page">
      <Header side="center">관심사 수정</Header>
      <div className="content">
        <section>
          <InterestForm initialInterests={interestData} subjects={subjectsData.subjects} />
        </section>
      </div>
    </div>
  );
}
