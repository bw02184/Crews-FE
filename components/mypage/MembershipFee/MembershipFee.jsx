'use client';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Box, Callout, Card, Flex, Strong, Text } from '@radix-ui/themes';
import styles from './MembershipFee.module.css';
import { useState } from 'react';
import Image from 'next/image';
import { ButtonL, ButtonM, Modal, SelectFilter } from '@/components/common';
import useModal from '@/hooks/useModal';
const crewaccountlist = [
  {
    id: 1,
    crewName: 'A모임',
    img: '/dev/img_bank.jpg',
    name: 'KB국민ONE통장',
    accountNumber: '987654321123',
    payday: 14,
    amount: 10000,
  },
  {
    id: 2,
    crewName: '우리모임',
    img: '/dev/img_bank.jpg',
    name: '우리CUBE통장',
    accountNumber: '110467158676',
    payday: 13,
    amount: 20000,
  },
  {
    id: 3,
    crewName: '너네모임',
    img: '/dev/img_bank.jpg',
    name: '신한 주거래 우대통장',
    accountNumber: '330467158676',
    payday: 12,
    amount: 30000,
  },
];

export default function MembershipFee() {
  const [selectedAccount, setSelectedAccount] = useState(crewaccountlist[0]);
  const { isOpen, openModal, closeModal } = useModal();
  const handleSelect = (filter, params) => {
    const selected = crewaccountlist.find((item) => item.params === params);
    setSelectedAccount(selected);
  };
  return (
    <Flex direction="column" gap="20px">
      <Flex direction="column" gap="10px">
        <SelectFilter
          selectList={crewaccountlist.map((account) => ({
            ...account,
            text: account.crewName,
            params: account.id,
          }))}
          onSelect={handleSelect}
        >
          {crewaccountlist[0].crewName}
        </SelectFilter>
        <Card>
          <Flex align="center" gap="10px">
            <Box className={styles.img_box}>
              <Box className="back_img" style={{ backgroundImage: `url(${selectedAccount.img})` }}>
                <Image src={selectedAccount.img} width={36} height={36} alt={selectedAccount.name} />
              </Box>
            </Box>
            <Flex direction="column" gap="2px">
              <Text as="p" size="2" weight="medium">
                {selectedAccount.name}
              </Text>
              <Text as="p" size="3" className="gray_t2">
                {selectedAccount.accountNumber}
              </Text>
            </Flex>
          </Flex>
        </Card>

        <Callout.Root color="green">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            납부일은 매월 {selectedAccount.payday}일 {selectedAccount.amount}원 입니다.
          </Callout.Text>
        </Callout.Root>
      </Flex>

      <Flex direction="column">
        <Box align="center">
          <Image src="/icons/ico_up_arrow.svg" width={30} height={30} alt="up arrow" />
        </Box>
        <Flex direction="column" gap="10px">
          <SelectFilter filter="location" selectList={crewaccountlist} onSelect={handleSelect}>
            {crewaccountlist[0].text}
          </SelectFilter>
          <Card>
            <Flex justify="between" align="center">
              <Strong>
                <span className="underline">우리FISA 통장</span>
              </Strong>
              <Text size="2" className="gray_t2">
                에서
              </Text>
            </Flex>
            <Flex justify="between" align="center">
              <Strong>30,000</Strong>
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
