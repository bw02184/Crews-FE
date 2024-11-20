import mypageAPI from '@/apis/mypageAPI';
import { Header, TabMenu } from '@/components/common';
import ProfileCard from '@/components/mypage/profilecard/ProfileCard';
import { tabMenuList } from '@/constants/tabMenuList/mypage';

export default async function Layout({ children }) {
  const profileData = await mypageAPI.getProfile();

  if (profileData?.error) {
    throw new Error(profileData.error);
  }
  return (
    <div className="page">
      <Header side="left">마이페이지</Header>
      <div className="content">
        <section>
          <ProfileCard profileData={profileData} />
        </section>
        <TabMenu tabMenuList={tabMenuList}></TabMenu>
        <section>{children}</section>
      </div>
    </div>
  );
}
