import AccountDetail from '@/components/agits/Account/AccountDetail';
import ArrowButton from '@/components/agits/Account/ArrowButton';
import DuesModal from '@/components/agits/Account/DuesModal';
import ProfileCard from '@/components/agits/Account/ProfileCard';
import { ButtonL, ButtonS, Header, Modal, Title } from '@/components/common';
import { accountDetail } from '@/constants/dummy';

import { date } from '@/constants/dummy';
import { Box, Flex, Text } from '@radix-ui/themes';
const profileDatas = {
  size: 2,
  list: [
    {
      profileImage: null,
      email: '1234@gmail.com',
      name: 'sws',
      nickname: '날라다니는무디',
      interests: null,
    },
    {
      profileImage: null,
      email: '1234@gmail.com',
      name: 'sws',
      nickname: '날라다니는무디',
      interests: null,
    },
  ],
};

export default function Page() {
  return (
    <div className="page">
      <Header side="center">회비 납부 관리</Header>
      <Flex direction="column" gap="10px" className="content">
        <section>
          <ArrowButton data={date}></ArrowButton>
          <DuesModal></DuesModal>
        </section>
        <section>
          <Flex direction="column" gap="20px">
            <Flex justify="between">
              <Title>미납 인원</Title>
              <Text as="p" size="2" weight="medium" className="gray_t1">
                {profileDatas.size}명
              </Text>
            </Flex>
            <Flex direction="column" gap="10px" asChild>
              <ul>
                {profileDatas.list.map((profileData, i) => {
                  return <ProfileCard key={i} profileData={profileData}></ProfileCard>;
                })}
              </ul>
            </Flex>
            <ButtonL style="deep">일괄요청</ButtonL>
          </Flex>
        </section>
        <section>
          <Title>이체내역</Title>

          <Box mt="1">
            <ul>
              {accountDetail.map((detail, i) => {
                return <AccountDetail data={detail} key={`detail${i}`} />;
              })}
            </ul>
          </Box>
        </section>
      </Flex>
    </div>
  );
}
