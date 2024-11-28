'use client';
import { Box, Card, Flex, Strong, Text } from '@radix-ui/themes';
import styles from './FeePayment.module.css';
import { useState } from 'react';
import Image from 'next/image';
import { ButtonL, ButtonM, Modal, SelectFilter } from '@/components/common';
import { useModal } from '@/hooks';

export default function FeePayment({ agitId, data }) {
  const crewaccountlist = data.crewAccountList;
  const personalaccountlist = data.personalAccountList.map((account) => ({
    ...account,
    text: account.productName,
  }));
  console.log(personalaccountlist);
  const selectedCrewAccouont = crewaccountlist.find((item) => item.agitId == agitId);
  const [selectedAccount, setSelectedAccount] = useState(personalaccountlist[0]);
  const { isOpen, openModal, closeModal } = useModal();
  const handleSelect = (filter, params) => {
    const selected = personalaccountlist.find((item) => item.params === params);
    setSelectedAccount(selected);
  };
  return (
    <Flex direction="column" gap="20px">
      <Flex direction="column" gap="10px">
        <Card>
          <Flex align="center" gap="10px">
            <Box className={styles.img_box}>
              <Box className="back_img" style={{ backgroundImage: `url('/dev/img_bank.jpg')` }}>
                <Image src={'/dev/img_bank.jpg'} width={36} height={36} alt={selectedCrewAccouont.bankName} />
              </Box>
            </Box>
            <Flex direction="column" gap="2px">
              <Text as="p" size="2" weight="medium">
                {selectedCrewAccouont.productName}
              </Text>
              <Text as="p" size="3" className="gray_t2">
                {selectedCrewAccouont.accountNumber}
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
      <Flex direction="column">
        <Box align="center">
          <Image src="/icons/ico_up_arrow.svg" width={30} height={30} alt="up arrow" />
        </Box>
        <Flex direction="column" gap="10px">
          <SelectFilter filter="location" selectList={personalaccountlist} onSelect={handleSelect}>
            {personalaccountlist[0].productName}
          </SelectFilter>
          <Card>
            <Flex justify="between" align="center">
              <Strong>
                <span className="underline">{selectedAccount.productName}</span>
              </Strong>
              <Text size="3" className="gray_t2">
                에서
              </Text>
            </Flex>
            <Flex justify="between" align="center">
              <Strong>{selectedCrewAccouont.duesAmount}</Strong>
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
