import { Header } from '@/components/common';
import InterestForm from '@/components/mypage/interest/InterestForm';
import instance from '@/apis/instance';

export default async function Page() {
  let initialInterests = [];
  try {
    const response = await instance.get('members/me/interests');
    initialInterests = response.data.interests || [];
  } catch (error) {
    console.error('관심사 가져오기에 실패했습니다:', error.message);
    initialInterests = [
      {
        nickName: '파란피터팬',
        interests: [
          { interestId: 1, interestName: '등산' },
          { interestId: 13, interestName: '캠핑' },
          { interestId: 30, interestName: '미식 탐방' },
          { interestId: 25, interestName: '보드게임' },
        ],
      },
    ];
  }
  const subjects = [
    {
      subjectId: 1,
      subjectName: '운동',
      interests: [
        { interestId: 1, interestName: '등산' },
        { interestId: 2, interestName: '조기축구회' },
        { interestId: 3, interestName: '해양 스포츠' },
        { interestId: 4, interestName: '클라이밍' },
        { interestId: 5, interestName: '피트니스' },
        { interestId: 6, interestName: '러닝' },
        { interestId: 7, interestName: '요가 및 필라테스' },
        { interestId: 8, interestName: '걷투기' },
      ],
    },
    {
      subjectId: 2,
      subjectName: '여행',
      interests: [
        { interestId: 9, interestName: '관광 명소' },
        { interestId: 10, interestName: '역사 탐방' },
        { interestId: 11, interestName: '로드트립' },
        { interestId: 12, interestName: '액티비티' },
        { interestId: 13, interestName: '캠핑' },
        { interestId: 14, interestName: '글램핑' },
        { interestId: 15, interestName: '에코 투어리즘' },
      ],
    },
    {
      subjectId: 3,
      subjectName: '반려동물',
      interests: [
        { interestId: 16, interestName: '훈련 및 교육' },
        { interestId: 17, interestName: '펫 패션' },
        { interestId: 18, interestName: '장난감' },
        { interestId: 19, interestName: '산책' },
        { interestId: 20, interestName: '임시보호' },
        { interestId: 21, interestName: '보호소 봉사' },
        { interestId: 22, interestName: '입양 캠페인' },
      ],
    },
    {
      subjectId: 4,
      subjectName: '게임/오락',
      interests: [
        { interestId: 23, interestName: '온라인 게임' },
        { interestId: 24, interestName: '콘솔 게임' },
        { interestId: 25, interestName: '보드게임' },
        { interestId: 26, interestName: 'VR/AR' },
        { interestId: 27, interestName: '스트리밍' },
        { interestId: 28, interestName: '레트로 게임' },
        { interestId: 29, interestName: 'e스포츠' },
      ],
    },
    {
      subjectId: 5,
      subjectName: '식도락',
      interests: [
        { interestId: 30, interestName: '미식 탐방' },
        { interestId: 31, interestName: '스트리트 푸드' },
        { interestId: 32, interestName: '비건' },
        { interestId: 33, interestName: '건강식' },
        { interestId: 34, interestName: '디저트' },
        { interestId: 35, interestName: '와인' },
        { interestId: 36, interestName: '농장 체험' },
        { interestId: 37, interestName: '로컬 푸드' },
      ],
    },
  ];

  return (
    <div className="page">
      <Header side="center">관심사 수정</Header>
      <div className="content">
        <section>
          <InterestForm initialInterests={initialInterests} subjects={subjects} />
        </section>
      </div>
    </div>
  );
}
