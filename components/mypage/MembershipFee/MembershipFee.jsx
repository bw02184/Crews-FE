'use client';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Box, Callout, Card, Flex, Strong, Text } from '@radix-ui/themes';
import styles from './MembershipFee.module.css';
import { useState } from 'react';
import Image from 'next/image';
import { ButtonL, ButtonM, Modal, SelectFilter } from '@/components/common';
import { useModal } from '@/hooks';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import instance from '@/apis/instance';

export default function MembershipFee({ crewData: crewFallbackData, myData: myFallbackData }) {
  const { data: crewData = [] } = useSWR('members/me/agits-accounts', () => instance.get('members/me/agits-accounts'), {
    fallbackData: crewFallbackData,
  });

  const { data: myData = [] } = useSWR('members/me/my-accounts', () => instance.get('members/me/my-accounts'), {
    fallbackData: myFallbackData,
  });
  console.log('aaaaaa', myFallbackData);
  console.log('aaaaaa', crewFallbackData);
  const [selectedCrewAccount, setSelectedCrewAccount] = useState(() => crewFallbackData?.[0] || null);
  const [selectedMyAccount, setSelectedMyAccount] = useState(() => myFallbackData?.[0] || null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleCrewSelect = (filter, params) => {
    const selected = crewData.find((item) => item.agitId === params);
    setSelectedCrewAccount(selected);
  };

  const handleMySelect = (filter, params) => {
    const selected = myData.find((item) => item.accountId === params);
    setSelectedMyAccount(selected);
  };
  console.log('bbbbbb', myFallbackData);
  console.log('bbbbb', crewFallbackData);
  const router = useRouter();

  return (
    <Flex direction="column" gap="20px">
      <Flex direction="column" gap="10px">
        <SelectFilter
          selectList={crewFallbackData.map((account) => ({
            ...account,
            text: account.agitName,
            params: account.agitId,
          }))}
          onSelect={handleCrewSelect}
        >
          {crewFallbackData[0].agitName}
        </SelectFilter>
        <Card>
          <Flex align="center" gap="10px">
            {selectedCrewAccount && (
              <Box className={styles.img_box}>
                <Box
                  className="back_img"
                  style={{ backgroundImage: `url(${selectedCrewAccount.bankImage || '/default-image.jpg'})` }}
                >
                  <Image src="/imgs/img_bg_bank.jpg" width={36} height={36} alt={selectedCrewAccount.name} />
                </Box>
              </Box>
            )}
            <Flex direction="column" gap="2px">
              <Text as="p" size="2" weight="medium">
                {selectedCrewAccount.name}
              </Text>
              <Text as="p" size="3" className="gray_t2">
                {selectedCrewAccount.accountNumber}
              </Text>
            </Flex>
          </Flex>
        </Card>

        <Callout.Root color="green">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            납부일은 매월 {selectedCrewAccount.payday}일 {selectedCrewAccount.ammount}원 입니다.
          </Callout.Text>
        </Callout.Root>
      </Flex>

      <Flex direction="column">
        <Box align="center">
          <Image src="/icons/ico_up_arrow.svg" width={30} height={30} alt="up arrow" />
        </Box>
        <Flex direction="column" gap="10px">
          <SelectFilter
            selectList={myFallbackData.map((account) => ({
              ...account,
              text: account.accountName,
              params: account.accountId,
            }))}
            onSelect={handleMySelect}
          >
            {myFallbackData[0].accountName}
          </SelectFilter>

          <Card>
            <Flex justify="between" align="center">
              <Strong>
                <span className="underline">{selectedMyAccount.accountName}</span>
              </Strong>
              <Text size="2" className="gray_t2">
                에서
              </Text>
            </Flex>
            <Flex justify="between" align="center">
              <Strong>{selectedCrewAccount.ammount}</Strong>
              <Text size="2" className="gray_t2">
                원 만큼
              </Text>
            </Flex>
          </Card>
          <ButtonL style="deep" onClick={openModal}>
            이체하기
          </ButtonL>
        </Flex>
      </Flex>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        header={{
          title: `이체 하시겠습니까?`,
        }}
        footer={
          <ButtonM
            leftButton={{ text: '취소', onClick: closeModal }}
            rightButton={{ text: '확인', onClick: closeModal }}
          />
        }
      />
    </Flex>
  );
}
