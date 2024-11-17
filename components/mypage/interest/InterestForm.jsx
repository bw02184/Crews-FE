'use client';

import { ButtonL, ButtonS, Label, Modal, Toast } from '@/components/common';
import { Box, Flex, Text } from '@radix-ui/themes';
import instance from '@/apis/instance';
import { useEffect, useState } from 'react';
import BottomButton from '../bottombutton/BootomButton';
import styles from './InterestForm.module.css';
import useModal from '@/hooks/useModal';
import useToast from '@/hooks/useToast';
export default function InterestForm() {
  // TODO: 토큰에서 유저 정보 갖고와서 사용
  const userName = '거북이두루미';
  const [subjects, setSubjects] = useState([]);
  const [interests, setInterests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const { toast, setToast, toastMessage, showToast } = useToast();
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        setIsLoading(true);
        const data = await instance.get('/members/me/interests');
        setInterests(data.interests);
        setSelectedInterests(data.interests.map((interest) => interest.id));
      } catch (error) {
        console.error('관심사 가져오기에 실패했습니다:', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterests();
  }, []);

  const sendinterestsToBackend = async () => {
    setIsLoading(true);

    if (selectedInterests.length < 3) {
      showToast('관심사를 3개 이상 선택해주세요!');
      setIsLoading(false);
      return;
    }

    const requestBody = { interests: selectedInterests };
    console.log('전송할 관심사 데이터:', JSON.stringify(requestBody, null, 2));

    try {
      await instance.post('/members/me/interests', requestBody);
      console.log('관심사 전송 성공');
    } catch (error) {
      console.error('관심사 전송 실패 :', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleInterest = (interestId) => {
    setSelectedInterests((prevSelected) =>
      prevSelected.includes(interestId)
        ? prevSelected.filter((id) => id !== interestId)
        : [...prevSelected, interestId],
    );
  };

  const onUpdateInterests = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    sendinterestsToBackend();
  };

  const getAllInterests = async (e) => {
    try {
      setIsLoading(true);
      const response = await instance.get('/interests', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('관심사 조회 성공!');
        // openModal(); // TODO: api 연결 후 주석 해제
      }
    } catch (error) {
      console.error('관심사 조회 실패 :', error.message);
    } finally {
      openModal(); // TODO: api 연결 후 삭제
      setIsLoading(false);
    }
  };

  return (
    <Box className="input">
      <Toast as="alert" isActive={toast} onClose={() => setToast(false)}>
        <Text>{toastMessage}</Text>
      </Toast>
      <form onSubmit={onUpdateInterests}>
        <Flex direction="column" gap="5px">
          <Text as="label" className={styles.label}>
            관심사
          </Text>
          <Flex direction="column" gapY="20px">
            <div className={styles.tags}>
              {interests.length > 0 ? (
                interests.map((interest, id) => (
                  <Label key={`interest${id}`} style="deep">
                    #{interest.interest}
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
                  title: `${userName}님의 관심사는 무엇인가요?`,
                  text:
                    '좋아하거나 알아가고 싶은 관심사를 3개 이상 선택해주세요. ' +
                    userName +
                    '님에게 딱 맞는 모임을 추천해드려요.',
                }}
              >
                <div>
                  {subjects.map((subject) => (
                    <div key={subject.id} className={styles.subjectContainer}>
                      <Text className={styles.subjectTitle}>{subject.interest}</Text>
                      <div className={styles.interestTags}>
                        {interests
                          .filter((interest) => interest.subjectId === subject.id)
                          .map((interest) => (
                            <div key={interest.id} className={styles.checkboxWrapper}>
                              <input
                                type="checkbox"
                                id={`interest-${interest.id}`}
                                checked={selectedInterests.includes(interest.id)}
                                onChange={() => toggleInterest(interest.id)}
                                className={styles.checkboxInput}
                              />
                              <label
                                htmlFor={`interest-${interest.id}`}
                                className={`${styles.checkboxLabel} ${
                                  selectedInterests.includes(interest.id) ? styles.selectedTag : ''
                                }`}
                              >
                                {interest.interest}
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Modal>
            </div>
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
