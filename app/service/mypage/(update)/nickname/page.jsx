import { getNickname } from '@/apis/mypageAPI';
import { Header } from '@/components/common';
import NicknameForm from '@/components/mypage/form/NicknameForm';

export default async function page() {
  const nicknameData = await getNickname();

  if (nicknameData?.error) {
    throw new Error(nicknameData.error);
  }
  return (
    <div className="page">
      <Header side="center">닉네임 수정</Header>
      <div className="content">
        <section>
          <NicknameForm nicknameData={nicknameData} />
        </section>
      </div>
    </div>
  );
}
