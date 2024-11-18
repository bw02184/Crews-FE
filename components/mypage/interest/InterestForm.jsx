'use client';

import { ButtonL, ButtonS, Label, Modal, Toast } from '@/components/common';
import { Box, Flex, Text } from '@radix-ui/themes';
import { useState } from 'react';
import BottomButton from '../bottombutton/BootomButton';
import styles from './InterestForm.module.css';
import useModal from '@/hooks/useModal';
import useToast from '@/hooks/useToast';
import mypageAPI from '@/apis/mypageAPI';

export default function InterestForm({ initialInterests, subjects }) {
  const [interests, setInterests] = useState(initialInterests[0]?.interests || []);
  const [selectedInterests, setSelectedInterests] = useState(
    initialInterests[0]?.interests.map((interest) => interest.interestId) || [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const { toast, setToast, toastMessage, showToast } = useToast();
  const userName = initialInterests[0]?.nickName || '사용자';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (selectedInterests.length < 3) {
      showToast('관심사를 3개 이상 선택해주세요!');
      setIsLoading(false);
      return;
    } else if (selectedInterests.length > 10) {
      showToast('관심사를 10개 이하로 선택해주세요!');
      setIsLoading(false);
      return;
    }
    try {
      await mypageAPI.updateInterests(selectedInterests);
      showToast('관심사가 성공적으로 저장되었습니다.');
      closeModal();
    } catch (error) {
      console.error('관심사 전송 실패:', error);
      showToast('관심사 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleInterest = (interestId) => {
    setSelectedInterests((prev) => {
      const newSelected = prev.includes(interestId) ? prev.filter((id) => id !== interestId) : [...prev, interestId];
      const selectedInterestObjects = subjects
        .flatMap((subject) => subject.interests)
        .filter((interest) => newSelected.includes(interest.interestId));
      setInterests(selectedInterestObjects);
      return newSelected;
    });
  };
  const getAllInterests = () => {
    openModal();
  };

  return (
    <Box className="input">
      <Toast as="alert" isActive={toast} onClose={() => setToast(false)}>
        <Text>{toastMessage}</Text>
      </Toast>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="5px">
          <Text as="label" weight="bold">
            관심사
          </Text>
          <Flex direction="column" gapY="40px">
            <Flex align="center" wrap="wrap" gap="10px">
              {interests.length > 0 ? (
                interests.map((interest, id) => (
                  <Label key={`interest${id}`} style="deep">
                    #{interest.interestName}
                  </Label>
                ))
              ) : (
                <Text as="p" size="2" className={styles.gray_2}>
                  관심사를 등록하면 맞춤형 모임을 추천해드려요!
                </Text>
              )}
              <ButtonS
                onClick={getAllInterests}
                style="light"
                icon={{ src: '/icons/ico_setting.svg', width: '15', height: '15', alt: '설정' }}
              >
                설정
              </ButtonS>
              <Modal
                isOpen={isOpen}
                closeModal={closeModal}
                header={{
                  title: `"${userName}"님의 관심사는 무엇인가요?`,
                  text:
                    '좋아하거나 알아가고 싶은 관심사를 3개 이상 선택해주세요. ' +
                    userName +
                    '님에게 딱 맞는 모임을 추천해드려요.',
                }}
              >
                <Flex direction="column" gap="20px" className={styles.modalContent}>
                  {subjects.map((subject) => (
                    <Flex direction="column" gap="10px" key={subject.subjectId} className={styles.subjectContainer}>
                      <Text weight="bold">{subject.subjectName}</Text>
                      <Flex gap="10px" wrap="wrap" asChild>
                        <ul className={styles.tags}>
                          {subject.interests.map((interest) => (
                            <li key={interest.interestId} className={styles.checkboxWrapper}>
                              <input
                                type="checkbox"
                                id={`interest-${interest.interestId}`}
                                checked={selectedInterests.includes(interest.interestId)}
                                onChange={() => toggleInterest(interest.interestId)}
                                className={styles.checkboxInput}
                              />
                              <label
                                htmlFor={`interest-${interest.interestId}`}
                                className={`${styles.checkboxLabel} ${
                                  selectedInterests.includes(interest.interestId) ? styles.selected : ''
                                }`}
                              >
                                {interest.interestName}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              </Modal>
            </Flex>
            <ButtonL type="submit" style="deep" disabled={isLoading}>
              {isLoading ? '처리 중...' : '수정'}
            </ButtonL>
          </Flex>
        </Flex>
        <BottomButton />
      </form>
    </Box>
  );
}
