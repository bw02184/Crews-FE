'use client';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Box, Callout, Card, Flex, Strong, Text } from '@radix-ui/themes';
import styles from './MembershipFee.module.css';
import { Suspense, useEffect } from 'react';
import Image from 'next/image';
import { ButtonL, Modal, PinNumber, SelectFilter, Toast } from '@/components/common';
import { useModal } from '@/hooks';
import useSWR, { mutate } from 'swr';
import { useMembershipStore } from '@/stores/mypageStore';
import { useToast } from '@/hooks';
import { useRouter } from 'next/navigation';
import { getPersonalAccounts } from '@/apis/mypageAPI';

export default function MembershipFee({ crewData: crewFallbackData, myData: myFallbackData }) {
  const { toast, setToast, toastMessage, showToast } = useToast();
  const { isOpen: pinIsOpen, openModal: pinOpenModal, closeModal: pinCloseModal } = useModal();

  const { data: crewData = [] } = useSWR('members/me/agits-accounts', async () => await getFeePaymentInfo(), {
    fallbackData: crewFallbackData,
  });

  const { data: myData = [] } = useSWR('members/me/my-accounts', async () => await getPersonalAccounts(), {
    fallbackData: myFallbackData,
  });

  const router = useRouter();

  const { setSelectedCrewAccount, storeSelectedCrewAccount, setSelectedMyAccount, storeSelectedMyAccount } =
    useMembershipStore();

  const selectedCrewAccount = storeSelectedCrewAccount || crewFallbackData?.[0] || {};
  const selectedMyAccount = storeSelectedMyAccount || myFallbackData?.[0] || {};

  useEffect(() => {
    if (!storeSelectedCrewAccount && crewFallbackData?.[0]) {
      setSelectedCrewAccount(crewFallbackData[0]);
    }
    if (!storeSelectedMyAccount && myFallbackData?.[0]) {
      setSelectedMyAccount(myFallbackData[0]);
    }
  }, [
    storeSelectedCrewAccount,
    crewFallbackData,
    setSelectedCrewAccount,
    storeSelectedMyAccount,
    myFallbackData,
    setSelectedMyAccount,
  ]);

  const handleCrewSelect = (filter, params) => {
    const selected = crewData.find((item) => item.agitId === params);
    setSelectedCrewAccount(selected);
    mutate('members/me/agits-accounts', undefined, { revalidate: true });
    mutate('members/me/my-accounts', undefined, { revalidate: true });
  };

  const handleMySelect = (filter, params) => {
    const selected = myData.find((item) => item.accountId === params);
    setSelectedMyAccount(selected);
    mutate('members/me/agits-accounts', undefined, { revalidate: true });
    mutate('members/me/my-accounts', undefined, { revalidate: true });
  };

  const handleFeeCallback = async (isSuccess, message, crewAccountId, myAccountId) => {
    if (isSuccess) {
      pinCloseModal();
      mutate([crewAccountId, myAccountId]);
      mutate('members/me/agits-accounts', undefined, { revalidate: true });
      mutate('members/me/my-accounts', undefined, { revalidate: true });
      handleCrewSelect();
      showToast(message);
      router.push('/service/mypage/fee');
    } else {
      showToast(`이체 실패: ${message}`);
    }
  };

  return (
    <Flex direction="column" gap="20px">
      <Flex direction="column" gap="10px">
        <SelectFilter
          key={selectedCrewAccount?.paid}
          selectList={crewData?.map((account) => ({
            ...account,
            text: account.agitName,
            params: account.agitId,
          }))}
          onSelect={handleCrewSelect}
        >
          {selectedCrewAccount?.agitName || '크루 계좌 선택'}
        </SelectFilter>
        <Toast as="alert" isActive={toast} onClose={() => setToast(false)} autoClose={1500}>
          <Text>{toastMessage}</Text>
        </Toast>
        <Card>
          <Flex align="center" gap="10px">
            {selectedCrewAccount && (
              <Box className={styles.img_box}>
                <Box
                  className="back_img"
                  style={{ backgroundImage: `url(${selectedCrewAccount.bankImage || '/default-image.jpg'})` }}
                >
                  <Image src="/imgs/img_bg_bank.jpg" width={36} height={36} alt="은행로고" />
                </Box>
              </Box>
            )}
            <Flex direction="column" gap="2px">
              <Text as="p" size="2" weight="medium">
                {selectedCrewAccount.productName}
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
            selectList={myData.map((account) => ({
              ...account,
              text: account.accountName,
              params: account.accountId,
            }))}
            onSelect={handleMySelect}
          >
            {selectedMyAccount?.accountName || '내 계좌 선택'}
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
              <Strong>{selectedCrewAccount.remainingAmount}</Strong>
              <Text size="2" className="gray_t2">
                원 만큼
              </Text>
            </Flex>
          </Card>
          <ButtonL style="deep" onClick={pinOpenModal} disabled={selectedCrewAccount.paid}>
            이체하기
          </ButtonL>
        </Flex>
      </Flex>

      <Modal
        isOpen={pinIsOpen}
        closeModal={pinCloseModal}
        header={{
          title: (
            <>
              <span className="underline">PIN번호를 인증</span>해 주세요.
            </>
          ),
          text: '정확히 일치해야 합니다.',
        }}
      >
        <Suspense>
          <PinNumber
            defaultStage={'auth'}
            defaultStatus={'transferMyage'}
            data={{
              agitId: selectedCrewAccount.agitId,
              crewAccountId: selectedCrewAccount.accountId,
              myAccountId: selectedMyAccount.accountId,
              amount: selectedCrewAccount.remainingAmount,
            }}
            callback={handleFeeCallback}
          />
        </Suspense>
      </Modal>
    </Flex>
  );
}
