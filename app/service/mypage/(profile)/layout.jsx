import { Header, TabMenu } from '@/components/common';
import ProfileCard from '@/components/mypage/profilecard/ProfileCard';
import { tabMenuList } from '@/constants/tabMenuList/mypage';

const imsiData = {
  image: 'https://hwamockyee.s3.ap-northeast-2.amazonaws.com/IMG_0185.JPG',
  name: '가나다라', // 사용자 이름
  email: 'abc@naver.com', // 이메일 주소
  interests: [
    { id: 1, interest: '등산' },
    { id: 2, interest: '로드 트립' },
    { id: 3, interest: '미식탐방' },
  ], // 관심사 배열
};
export default function Layout({ children }) {
  return (
    <div className="page">
      <Header side="left">마이페이지</Header>
      <div className="content">
        <section>
          <ProfileCard data={imsiData}></ProfileCard>
        </section>
        <TabMenu tabMenuList={tabMenuList}></TabMenu>
        <section>{children}</section>
      </div>
    </div>
  );
}
