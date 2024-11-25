'use client';

import AccountDetail from '@/components/agits/Account/AccountDetail';
import ArrowButton from '@/components/agits/Account/ArrowButton';
import DuesModalContent from '@/components/agits/Account/DuesModalContent';
import ProfileCard from '@/components/agits/Account/ProfileCard';
import { ButtonL, ButtonS, Header, Modal, Title } from '@/components/common';
import { accountDetail } from '@/constants/dummy';

import { date } from '@/constants/dummy';
import useModal from '@/hooks/useModal';
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
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div className="page">
      <header>
        <Header side="center">회비 납부 관리</Header>
      </header>
      <Flex direction="column" gap="10px" className="content">
        <section>
          <ArrowButton data={date}></ArrowButton>
          <Flex justify="center" mt="10px">
            <Box>
              <ButtonS
                style="light"
                icon={{ src: '/icons/ico_setting.svg', width: '14', height: '14', alt: '설정' }}
                onClick={openModal}
              >
                회비설정
              </ButtonS>
              <Modal isOpen={isOpen} closeModal={closeModal} header={{ title: '회비 설정을 변경하시겠습니까?' }}>
                <DuesModalContent></DuesModalContent>
              </Modal>
            </Box>
          </Flex>
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
