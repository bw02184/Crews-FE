'use client';
import { ButtonL, Header, Title } from '@/components/common';
import { Box, Flex, Text } from '@radix-ui/themes';
import DuesModal from './DuesModal';
import ArrowButton from '../dues/ArrowButton';
import ProfileCard from './ProfileCard';
import AccountDetail from '../AccountDetail';
import { crewAccountDepositInfo, getDuesProfile } from '@/apis/agitsAPI';
import { useState } from 'react';
import useSWR from 'swr';

export default function DuesManage({ agitId, commonDues, profileDatas, accountDetail }) {
  const [yearAndMonth, setYearAndMonth] = useState({});
  const handleDateChange = (newDate) => {
    setYearAndMonth(newDate);
  };

  const { data: crewAccountDetail } = useSWR(
    yearAndMonth.year &&
      yearAndMonth.month &&
      `agits/${agitId}/accounts/deposit?year=${yearAndMonth.year}&month=${yearAndMonth.month}`,
    async () => {
      const response = await crewAccountDepositInfo(agitId, yearAndMonth);
      return response;
    },
    {
      fallbackData: accountDetail,
    },
  );

  const { data: profileDatasInfo } = useSWR(
    yearAndMonth.year &&
      yearAndMonth.month &&
      `agits/${agitId}/managements/dues?year=${yearAndMonth.year}}&month=${yearAndMonth.month}`,
    async () => {
      const response = await getDuesProfile(agitId, yearAndMonth);
      return response;
    },
    {
      fallbackData: profileDatas,
    },
  );

  return (
    <div className="page">
      <Header side="center">회비 납부 관리</Header>
      <Flex direction="column" gap="10px" className="content">
        <section>
          <ArrowButton data={commonDues} handleDateChange={handleDateChange}></ArrowButton>
          <DuesModal agitId={agitId}></DuesModal>
        </section>
        <section>
          <Flex direction="column" gap="20px">
            <Flex justify="between" align="center">
              <Title>미납 인원</Title>
              <Text as="p" size="2" weight="medium" className="gray_t1">
                {profileDatasInfo?.memberCount}명
              </Text>
            </Flex>
            <Flex direction="column" asChild>
              <ul>
                {profileDatasInfo?.profileResponses?.map((profileData, i) => {
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
              {crewAccountDetail?.tranList?.map((detail, i) => {
                return <AccountDetail data={detail} key={`detail${i}`} />;
              })}
            </ul>
          </Box>
        </section>
      </Flex>
    </div>
  );
}
